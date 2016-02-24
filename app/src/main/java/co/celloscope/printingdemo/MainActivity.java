package co.celloscope.printingdemo;

import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.AsyncTask;
import android.os.Bundle;
import android.print.PrintJobInfo;
import android.support.v7.app.AppCompatActivity;
import android.widget.TextView;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;

public class MainActivity extends AppCompatActivity {

    private static final String RECEIPT_TYPE = "ReceiptType";
    private static final String JSON_DATA = "JsonData";
    private static final String TEMPLATE_HTML = "template.html";
    private static final String MINI_STATEMENT_TEMPLATE_HTML = "miniStatementTemplate.html";
    private WebViewPrint webViewPrint;
    private TextView statusTextView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        statusTextView = (TextView) findViewById(R.id.statusTextView);

        try {
            createPhoto();
            createQR();
            webViewPrint = new WebViewPrint(MainActivity.this);
            webViewPrint.print(getHtmlFile());

        } catch (IOException e) {
            e.printStackTrace();
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    private Bitmap getQRBitmap() {
        String qrData = "";
        String transactionCode = null;
        String requestId = null;
        try {
            JSONObject jsonObject = null;
            if (getJsonString() == null) {
                jsonObject = new JSONObject(getDummyJsonString(getReceiptType()));
            } else {
                jsonObject = new JSONObject(getJsonString());
            }
            if (jsonObject.has("transactionCode")) {
                transactionCode = jsonObject.getString("transactionCode");
            }
            if (jsonObject.has("requestId")) {
                requestId = jsonObject.getString("requestId");
            }

        } catch (JSONException e) {
            e.printStackTrace();
        }
        if (requestId != null) {
            qrData += requestId;
        }
        if (transactionCode != null) {
            qrData += ":" + transactionCode;
        }

        int qrCodeDimention = 500;

        QRCodeEncoder qrCodeEncoder = new QRCodeEncoder(qrData, null,
                Contents.Type.TEXT, BarcodeFormat.QR_CODE.toString(), qrCodeDimention);

        Bitmap bitmap = null;
        try {
            bitmap = qrCodeEncoder.encodeAsBitmap();
        } catch (WriterException e) {
            e.printStackTrace();
        }
        return bitmap;
    }

    private void createPhoto() throws JSONException {
        String imageString;
        if (getJsonString() == null) {
            imageString = getDummyHexStringForPhoto();
        } else {
            imageString = new JSONObject(getJsonString()).getString("photo");
        }
        if (imageString != null) {
            Bitmap b = createImageFromString(imageString);
            if (b != null) {
                FileHelper.saveBitmapFileToExternalCacheDirectory(MainActivity.this, b, "photo.png");
            }
        }
    }

    private void createQR() {
        Bitmap b = getQRBitmap();
        if (b != null) {
            FileHelper.saveBitmapFileToExternalCacheDirectory(MainActivity.this, b, "qr.png");
        }
    }

    boolean isResumeOnce = false;

    @Override
    public void onResume() {
        super.onResume();
        if (isResumeOnce) {
            AsyncTask.execute(new Runnable() {
                @Override
                public void run() {
                    checkPrintStatus();
                }
            });
        }
        isResumeOnce = true;
    }

    public static Bitmap createImageFromString(String hexString) {
        Bitmap bmp = null;
        try {
            byte[] barray = hexStringToByteArray2(hexString);
            bmp = BitmapFactory.decodeByteArray(barray, 0, barray.length);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return bmp;
    }

    public static final byte[] hexStringToByteArray2(final String hex) {
        byte[] bytes = new byte[(hex.length() / 2)];
        int j = 0;
        for (int i = 0; i < bytes.length; i++) {
            j = i * 2;
            String hex_pair = hex.substring(j, j + 2);
            byte b = (byte) (Integer.parseInt(hex_pair, 16) & 0xFF);
            bytes[i] = b;
        }
        return bytes;
    }

    public static String bytesToHexString(byte[] bytes) {
        StringBuilder sb = new StringBuilder();
        for (byte b : bytes) {
            sb.append(String.format("%02x", b & 0xff));
        }
        return sb.toString();
    }

    public static byte[] convertFileToByte(InputStream is) {

        ByteArrayOutputStream buffer = new ByteArrayOutputStream();

        int nRead;
        byte[] data = new byte[16384];

        try {
            while ((nRead = is.read(data, 0, data.length)) != -1) {
                buffer.write(data, 0, nRead);
            }
            buffer.flush();
        } catch (IOException e) {
            e.printStackTrace();
        }


        return buffer.toByteArray();
    }

    private void checkPrintStatus() {
        int state = webViewPrint.getState();
        switch (state) {
            case PrintJobInfo.STATE_BLOCKED:
                setResult(MainActivity.RESULT_CANCELED, new Intent());
                finish();
                break;
            case PrintJobInfo.STATE_CANCELED:
                setResult(MainActivity.RESULT_CANCELED, new Intent());
                finish();
                break;
            case PrintJobInfo.STATE_COMPLETED:
                setResult(MainActivity.RESULT_OK, new Intent());
                finish();
                break;
            case PrintJobInfo.STATE_CREATED:
                statusTextView.post(new Runnable() {
                    public void run() {
                        statusTextView.setText(R.string.printing);
                    }
                });
                checkPrintStatus();
                break;
            case PrintJobInfo.STATE_FAILED:
                setResult(MainActivity.RESULT_CANCELED, new Intent());
                finish();
                break;
            case PrintJobInfo.STATE_QUEUED:
                statusTextView.post(new Runnable() {
                    public void run() {
                        statusTextView.setText(R.string.printJobQueued);
                    }
                });
                checkPrintStatus();
                break;
            case PrintJobInfo.STATE_STARTED:
                statusTextView.post(new Runnable() {
                    public void run() {
                        statusTextView.setText(R.string.printingStarted);
                    }
                });
                checkPrintStatus();
                break;
            default:
                break;
        }
    }

    private File getHtmlFile() throws IOException {
        return FileHelper.createTempFileInExternalCacheDirectory(this, getHtml());
    }

    private String getHtml() throws IOException {
        String[] keys = {
                "#RECEIPT",
                "#JSONDATA"
        };
        String[] values = {getReceiptType().toString(), getJsonString()};

        if (values[0].equals("17")) {
            return new HtmlHelper(this).getHtml(MINI_STATEMENT_TEMPLATE_HTML, keys, values);
        } else {
            return new HtmlHelper(this).getHtml(TEMPLATE_HTML, keys, values);
        }
    }

    private Integer getReceiptType() {
        String receiptType = this.getIntent().getStringExtra(RECEIPT_TYPE);
        if (receiptType == null) {
            receiptType = "19";
        }
        return Integer.parseInt(receiptType);
    }

    private String getJsonString() {
        String jsonString = this.getIntent().getStringExtra(JSON_DATA);
        if (jsonString == null) {
            jsonString = getDummyJsonString(getReceiptType());
        }
        return jsonString;
    }

    private String getDummyHexStringForPhoto() {
        InputStream inputStream = null;
        try {
            inputStream = MainActivity.this.getAssets().open("photo.png");
        } catch (IOException e) {
            e.printStackTrace();
        }
        byte[] bytes = convertFileToByte(inputStream);
        return bytesToHexString(bytes);
    }

    private String getDummyJsonString(int receipt) {
        switch (receipt) {
            case 1:
                return "{\"accountName\":\"MD Arif Gazi\",\"accountNumber\":\"2001158500126\",\"agentName\":\"BADRUL ALOM\",\"balanceAmount\":\"BDT 80,550.00\",\"balanceAmountInWords\":\"EIGHTY THOUSAND FIVE HUNDRED FIFTY ONLY\",\"boothAddress\":\"VAIRAB BAZAR, CHOWDHURYR HAT, SONAGAZI\",\"charge\":\"BDT 7.50\",\"customerAddress\":\"GREEN GADEN BUILDING, FLAT- D4, HOUSE- 12, ROAD- 10, BLOCK- C, MIRPUR, PS- MIRPUR, DHAKA\",\"customerId\":\"CB1158500\",\"customerName\":\"Md. Arif Gazi\",\"depositAmountInWords\":\"THREE THOUSAND ONLY\",\"depositAmount\":\"BDT 3,000.00\",\"dpsAccountType\":\"DPS\",\"linkAccountNumber\":\"2005246987526\",\"maturityAmount\":\"BDT 2,26,047.00\",\"maturityDate\":\"19-JAN-2021\",\"mobileNo\":\"01617877595\",\"principalAmount\":\"BDT 1,00,000.00\",\"printDate\":\"19-JAN-2016 13:13:15 PM\",\"productTenor\":\"5 Years\",\"profitRate\":\"8.85% (Yearly)\",\"receiverAccountName\":\"SUJON PATWARY\",\"requestId\":\"12346\",\"termDepositAccountType\":\"TERM DEPOSIT\",\"transactionDate\":\"19-JAN-2016\",\"savingsAccountType\":\"Savings\",\"transactionCode\":\"TR222369\",\"userId\":\"615001001 (NAIM ISLAM)\",\"withdrawAmount\":\"BDT 3,000.00 + 7.5 (Charge)\",\"withdrawsAmountInWords\":\"THREE THOUSAND SEVEN TAKA FIFTY PAISA ONLY\",\"cardType\":\"ATM\",\"cardBrand\":\"VISA\",\"cardNumber\":\"1234 1234 1234 1234\",\"noOfLeave\":\"10\",\"chequeLeafNumber\":\"123 456 789 123\",\"chequeAmount\":\"BDT 10,000.00\",\"receiverName\":\"Asadul Haque\",\"chequeLostReason\":\"Lost\",\"retrieveFrom\":\"From Lost\",\"photo\":\"\",\"statement\":[[\"Date\",\"Description\",\"Deposit\",\"Withdraw\",\"Balance\"],[\"15-Dec-2016\",\"FT-School Fee\",\"\",\"500.00\",\"4500.00\"],[\"14-Dec-2016\",\"DEP Cash\",\"1500.00\",\"\",\"6000.00\"],[\"14-Dec-2016\",\"WDL-Cash\",\"\",\"2000.00\",\"4000.00\"],[\"13-Dec-2016\",\"FT-Other Bank\",\"\",\"2000.00\",\"2000.00\"],[\"12-Dec-2016\",\"DEP-Personal A/C\",\"7000.00\",\"\",\"9000.00\"]]}";
            case 2:
                return "{\"accountName\":\"MD Arif Gazi\",\"accountNumber\":\"2001158500126\",\"agentName\":\"BADRUL ALOM\",\"balanceAmount\":\"BDT 80,550.00\",\"balanceAmountInWords\":\"EIGHTY THOUSAND FIVE HUNDRED FIFTY ONLY\",\"boothAddress\":\"VAIRAB BAZAR, CHOWDHURYR HAT, SONAGAZI\",\"charge\":\"BDT 7.50\",\"customerAddress\":\"GREEN GADEN BUILDING, FLAT- D4, HOUSE- 12, ROAD- 10, BLOCK- C, MIRPUR, PS- MIRPUR, DHAKA\",\"customerId\":\"CB1158500\",\"customerName\":\"Md. Arif Gazi\",\"depositAmountInWords\":\"THREE THOUSAND ONLY\",\"depositAmount\":\"BDT 3,000.00\",\"dpsAccountType\":\"DPS\",\"linkAccountNumber\":\"2005246987526\",\"maturityAmount\":\"BDT 2,26,047.00\",\"maturityDate\":\"19-JAN-2021\",\"mobileNo\":\"01617877595\",\"principalAmount\":\"BDT 1,00,000.00\",\"printDate\":\"19-JAN-2016 13:13:15 PM\",\"productTenor\":\"5 Years\",\"profitRate\":\"8.85% (Yearly)\",\"receiverAccountName\":\"SUJON PATWARY\",\"requestId\":\"12346\",\"termDepositAccountType\":\"TERM DEPOSIT\",\"transactionDate\":\"19-JAN-2016\",\"savingsAccountType\":\"Savings\",\"transactionCode\":\"TR222369\",\"userId\":\"615001001 (NAIM ISLAM)\",\"withdrawAmount\":\"BDT 3,000.00 + 7.5 (Charge)\",\"withdrawsAmountInWords\":\"THREE THOUSAND SEVEN TAKA FIFTY PAISA ONLY\",\"cardType\":\"ATM\",\"cardBrand\":\"VISA\",\"cardNumber\":\"1234 1234 1234 1234\",\"noOfLeave\":\"10\",\"chequeLeafNumber\":\"123 456 789 123\",\"chequeAmount\":\"BDT 10,000.00\",\"receiverName\":\"Asadul Haque\",\"chequeLostReason\":\"Lost\",\"retrieveFrom\":\"From Lost\",\"photo\":\"\",\"statement\":[[\"Date\",\"Description\",\"Deposit\",\"Withdraw\",\"Balance\"],[\"15-Dec-2016\",\"FT-School Fee\",\"\",\"500.00\",\"4500.00\"],[\"14-Dec-2016\",\"DEP Cash\",\"1500.00\",\"\",\"6000.00\"],[\"14-Dec-2016\",\"WDL-Cash\",\"\",\"2000.00\",\"4000.00\"],[\"13-Dec-2016\",\"FT-Other Bank\",\"\",\"2000.00\",\"2000.00\"],[\"12-Dec-2016\",\"DEP-Personal A/C\",\"7000.00\",\"\",\"9000.00\"]]}";
            case 3:
                return "{\"accountName\":\"MD Arif Gazi\",\"accountNumber\":\"2001158500126\",\"agentName\":\"BADRUL ALOM\",\"balanceAmount\":\"BDT 80,550.00\",\"balanceAmountInWords\":\"EIGHTY THOUSAND FIVE HUNDRED FIFTY ONLY\",\"boothAddress\":\"VAIRAB BAZAR, CHOWDHURYR HAT, SONAGAZI\",\"charge\":\"BDT 7.50\",\"customerAddress\":\"GREEN GADEN BUILDING, FLAT- D4, HOUSE- 12, ROAD- 10, BLOCK- C, MIRPUR, PS- MIRPUR, DHAKA\",\"customerId\":\"CB1158500\",\"customerName\":\"Md. Arif Gazi\",\"depositAmountInWords\":\"THREE THOUSAND ONLY\",\"depositAmount\":\"BDT 3,000.00\",\"dpsAccountType\":\"DPS\",\"linkAccountNumber\":\"2005246987526\",\"maturityAmount\":\"BDT 2,26,047.00\",\"maturityDate\":\"19-JAN-2021\",\"mobileNo\":\"01617877595\",\"principalAmount\":\"BDT 1,00,000.00\",\"printDate\":\"19-JAN-2016 13:13:15 PM\",\"productTenor\":\"5 Years\",\"profitRate\":\"8.85% (Yearly)\",\"receiverAccountName\":\"SUJON PATWARY\",\"requestId\":\"12346\",\"termDepositAccountType\":\"TERM DEPOSIT\",\"transactionDate\":\"19-JAN-2016\",\"savingsAccountType\":\"Savings\",\"transactionCode\":\"TR222369\",\"userId\":\"615001001 (NAIM ISLAM)\",\"withdrawAmount\":\"BDT 3,000.00 + 7.5 (Charge)\",\"withdrawsAmountInWords\":\"THREE THOUSAND SEVEN TAKA FIFTY PAISA ONLY\",\"cardType\":\"ATM\",\"cardBrand\":\"VISA\",\"cardNumber\":\"1234 1234 1234 1234\",\"noOfLeave\":\"10\",\"chequeLeafNumber\":\"123 456 789 123\",\"chequeAmount\":\"BDT 10,000.00\",\"receiverName\":\"Asadul Haque\",\"chequeLostReason\":\"Lost\",\"retrieveFrom\":\"From Lost\",\"photo\":\"\",\"statement\":[[\"Date\",\"Description\",\"Deposit\",\"Withdraw\",\"Balance\"],[\"15-Dec-2016\",\"FT-School Fee\",\"\",\"500.00\",\"4500.00\"],[\"14-Dec-2016\",\"DEP Cash\",\"1500.00\",\"\",\"6000.00\"],[\"14-Dec-2016\",\"WDL-Cash\",\"\",\"2000.00\",\"4000.00\"],[\"13-Dec-2016\",\"FT-Other Bank\",\"\",\"2000.00\",\"2000.00\"],[\"12-Dec-2016\",\"DEP-Personal A/C\",\"7000.00\",\"\",\"9000.00\"]]}";
            case 4:
                return "{\"accountName\":\"MD Arif Gazi\",\"accountNumber\":\"2001158500126\",\"agentName\":\"BADRUL ALOM\",\"balanceAmount\":\"BDT 80,550.00\",\"balanceAmountInWords\":\"EIGHTY THOUSAND FIVE HUNDRED FIFTY ONLY\",\"boothAddress\":\"VAIRAB BAZAR, CHOWDHURYR HAT, SONAGAZI\",\"charge\":\"BDT 7.50\",\"customerAddress\":\"GREEN GADEN BUILDING, FLAT- D4, HOUSE- 12, ROAD- 10, BLOCK- C, MIRPUR, PS- MIRPUR, DHAKA\",\"customerId\":\"CB1158500\",\"customerName\":\"Md. Arif Gazi\",\"depositAmountInWords\":\"THREE THOUSAND ONLY\",\"depositAmount\":\"BDT 3,000.00\",\"dpsAccountType\":\"DPS\",\"linkAccountNumber\":\"2005246987526\",\"maturityAmount\":\"BDT 2,26,047.00\",\"maturityDate\":\"19-JAN-2021\",\"mobileNo\":\"01617877595\",\"principalAmount\":\"BDT 1,00,000.00\",\"printDate\":\"19-JAN-2016 13:13:15 PM\",\"productTenor\":\"5 Years\",\"profitRate\":\"8.85% (Yearly)\",\"receiverAccountName\":\"SUJON PATWARY\",\"requestId\":\"12346\",\"termDepositAccountType\":\"TERM DEPOSIT\",\"transactionDate\":\"19-JAN-2016\",\"savingsAccountType\":\"Savings\",\"transactionCode\":\"TR222369\",\"userId\":\"615001001 (NAIM ISLAM)\",\"withdrawAmount\":\"BDT 3,000.00 + 7.5 (Charge)\",\"withdrawsAmountInWords\":\"THREE THOUSAND SEVEN TAKA FIFTY PAISA ONLY\",\"cardType\":\"ATM\",\"cardBrand\":\"VISA\",\"cardNumber\":\"1234 1234 1234 1234\",\"noOfLeave\":\"10\",\"chequeLeafNumber\":\"123 456 789 123\",\"chequeAmount\":\"BDT 10,000.00\",\"receiverName\":\"Asadul Haque\",\"chequeLostReason\":\"Lost\",\"retrieveFrom\":\"From Lost\",\"photo\":\"\",\"statement\":[[\"Date\",\"Description\",\"Deposit\",\"Withdraw\",\"Balance\"],[\"15-Dec-2016\",\"FT-School Fee\",\"\",\"500.00\",\"4500.00\"],[\"14-Dec-2016\",\"DEP Cash\",\"1500.00\",\"\",\"6000.00\"],[\"14-Dec-2016\",\"WDL-Cash\",\"\",\"2000.00\",\"4000.00\"],[\"13-Dec-2016\",\"FT-Other Bank\",\"\",\"2000.00\",\"2000.00\"],[\"12-Dec-2016\",\"DEP-Personal A/C\",\"7000.00\",\"\",\"9000.00\"]]}";
            case 5:
                return "{\"accountName\":\"MD Arif Gazi\",\"accountNumber\":\"2001158500126\",\"agentName\":\"BADRUL ALOM\",\"balanceAmount\":\"BDT 80,550.00\",\"balanceAmountInWords\":\"EIGHTY THOUSAND FIVE HUNDRED FIFTY ONLY\",\"boothAddress\":\"VAIRAB BAZAR, CHOWDHURYR HAT, SONAGAZI\",\"charge\":\"BDT 7.50\",\"customerAddress\":\"GREEN GADEN BUILDING, FLAT- D4, HOUSE- 12, ROAD- 10, BLOCK- C, MIRPUR, PS- MIRPUR, DHAKA\",\"customerId\":\"CB1158500\",\"customerName\":\"Md. Arif Gazi\",\"depositAmountInWords\":\"THREE THOUSAND ONLY\",\"depositAmount\":\"BDT 3,000.00\",\"dpsAccountType\":\"DPS\",\"linkAccountNumber\":\"2005246987526\",\"maturityAmount\":\"BDT 2,26,047.00\",\"maturityDate\":\"19-JAN-2021\",\"mobileNo\":\"01617877595\",\"principalAmount\":\"BDT 1,00,000.00\",\"printDate\":\"19-JAN-2016 13:13:15 PM\",\"productTenor\":\"5 Years\",\"profitRate\":\"8.85% (Yearly)\",\"receiverAccountName\":\"SUJON PATWARY\",\"requestId\":\"12346\",\"termDepositAccountType\":\"TERM DEPOSIT\",\"transactionDate\":\"19-JAN-2016\",\"savingsAccountType\":\"Savings\",\"transactionCode\":\"TR222369\",\"userId\":\"615001001 (NAIM ISLAM)\",\"withdrawAmount\":\"BDT 3,000.00 + 7.5 (Charge)\",\"withdrawsAmountInWords\":\"THREE THOUSAND SEVEN TAKA FIFTY PAISA ONLY\",\"cardType\":\"ATM\",\"cardBrand\":\"VISA\",\"cardNumber\":\"1234 1234 1234 1234\",\"noOfLeave\":\"10\",\"chequeLeafNumber\":\"123 456 789 123\",\"chequeAmount\":\"BDT 10,000.00\",\"receiverName\":\"Asadul Haque\",\"chequeLostReason\":\"Lost\",\"retrieveFrom\":\"From Lost\",\"photo\":\"\",\"statement\":[[\"Date\",\"Description\",\"Deposit\",\"Withdraw\",\"Balance\"],[\"15-Dec-2016\",\"FT-School Fee\",\"\",\"500.00\",\"4500.00\"],[\"14-Dec-2016\",\"DEP Cash\",\"1500.00\",\"\",\"6000.00\"],[\"14-Dec-2016\",\"WDL-Cash\",\"\",\"2000.00\",\"4000.00\"],[\"13-Dec-2016\",\"FT-Other Bank\",\"\",\"2000.00\",\"2000.00\"],[\"12-Dec-2016\",\"DEP-Personal A/C\",\"7000.00\",\"\",\"9000.00\"]]}";
            case 6:
                return "{\"accountName\":\"MD Arif Gazi\",\"accountNumber\":\"2001158500126\",\"agentName\":\"BADRUL ALOM\",\"balanceAmount\":\"BDT 80,550.00\",\"balanceAmountInWords\":\"EIGHTY THOUSAND FIVE HUNDRED FIFTY ONLY\",\"boothAddress\":\"VAIRAB BAZAR, CHOWDHURYR HAT, SONAGAZI\",\"charge\":\"BDT 7.50\",\"customerAddress\":\"GREEN GADEN BUILDING, FLAT- D4, HOUSE- 12, ROAD- 10, BLOCK- C, MIRPUR, PS- MIRPUR, DHAKA\",\"customerId\":\"CB1158500\",\"customerName\":\"Md. Arif Gazi\",\"depositAmountInWords\":\"THREE THOUSAND ONLY\",\"depositAmount\":\"BDT 3,000.00\",\"dpsAccountType\":\"DPS\",\"linkAccountNumber\":\"2005246987526\",\"maturityAmount\":\"BDT 2,26,047.00\",\"maturityDate\":\"19-JAN-2021\",\"mobileNo\":\"01617877595\",\"principalAmount\":\"BDT 1,00,000.00\",\"printDate\":\"19-JAN-2016 13:13:15 PM\",\"productTenor\":\"5 Years\",\"profitRate\":\"8.85% (Yearly)\",\"receiverAccountName\":\"SUJON PATWARY\",\"requestId\":\"12346\",\"termDepositAccountType\":\"TERM DEPOSIT\",\"transactionDate\":\"19-JAN-2016\",\"savingsAccountType\":\"Savings\",\"transactionCode\":\"TR222369\",\"userId\":\"615001001 (NAIM ISLAM)\",\"withdrawAmount\":\"BDT 3,000.00 + 7.5 (Charge)\",\"withdrawsAmountInWords\":\"THREE THOUSAND SEVEN TAKA FIFTY PAISA ONLY\",\"cardType\":\"ATM\",\"cardBrand\":\"VISA\",\"cardNumber\":\"1234 1234 1234 1234\",\"noOfLeave\":\"10\",\"chequeLeafNumber\":\"123 456 789 123\",\"chequeAmount\":\"BDT 10,000.00\",\"receiverName\":\"Asadul Haque\",\"chequeLostReason\":\"Lost\",\"retrieveFrom\":\"From Lost\",\"photo\":\"\",\"statement\":[[\"Date\",\"Description\",\"Deposit\",\"Withdraw\",\"Balance\"],[\"15-Dec-2016\",\"FT-School Fee\",\"\",\"500.00\",\"4500.00\"],[\"14-Dec-2016\",\"DEP Cash\",\"1500.00\",\"\",\"6000.00\"],[\"14-Dec-2016\",\"WDL-Cash\",\"\",\"2000.00\",\"4000.00\"],[\"13-Dec-2016\",\"FT-Other Bank\",\"\",\"2000.00\",\"2000.00\"],[\"12-Dec-2016\",\"DEP-Personal A/C\",\"7000.00\",\"\",\"9000.00\"]]}";
            case 7:
                return "{\"accountName\":\"MD Arif Gazi\",\"accountNumber\":\"2001158500126\",\"agentName\":\"BADRUL ALOM\",\"balanceAmount\":\"BDT 80,550.00\",\"balanceAmountInWords\":\"EIGHTY THOUSAND FIVE HUNDRED FIFTY ONLY\",\"boothAddress\":\"VAIRAB BAZAR, CHOWDHURYR HAT, SONAGAZI\",\"charge\":\"BDT 7.50\",\"customerAddress\":\"GREEN GADEN BUILDING, FLAT- D4, HOUSE- 12, ROAD- 10, BLOCK- C, MIRPUR, PS- MIRPUR, DHAKA\",\"customerId\":\"CB1158500\",\"customerName\":\"Md. Arif Gazi\",\"depositAmountInWords\":\"THREE THOUSAND ONLY\",\"depositAmount\":\"BDT 3,000.00\",\"dpsAccountType\":\"DPS\",\"linkAccountNumber\":\"2005246987526\",\"maturityAmount\":\"BDT 2,26,047.00\",\"maturityDate\":\"19-JAN-2021\",\"mobileNo\":\"01617877595\",\"principalAmount\":\"BDT 1,00,000.00\",\"printDate\":\"19-JAN-2016 13:13:15 PM\",\"productTenor\":\"5 Years\",\"profitRate\":\"8.85% (Yearly)\",\"receiverAccountName\":\"SUJON PATWARY\",\"requestId\":\"12346\",\"termDepositAccountType\":\"TERM DEPOSIT\",\"transactionDate\":\"19-JAN-2016\",\"savingsAccountType\":\"Savings\",\"transactionCode\":\"TR222369\",\"userId\":\"615001001 (NAIM ISLAM)\",\"withdrawAmount\":\"BDT 3,000.00 + 7.5 (Charge)\",\"withdrawsAmountInWords\":\"THREE THOUSAND SEVEN TAKA FIFTY PAISA ONLY\",\"cardType\":\"ATM\",\"cardBrand\":\"VISA\",\"cardNumber\":\"1234 1234 1234 1234\",\"noOfLeave\":\"10\",\"chequeLeafNumber\":\"123 456 789 123\",\"chequeAmount\":\"BDT 10,000.00\",\"receiverName\":\"Asadul Haque\",\"chequeLostReason\":\"Lost\",\"retrieveFrom\":\"From Lost\",\"photo\":\"\",\"statement\":[[\"Date\",\"Description\",\"Deposit\",\"Withdraw\",\"Balance\"],[\"15-Dec-2016\",\"FT-School Fee\",\"\",\"500.00\",\"4500.00\"],[\"14-Dec-2016\",\"DEP Cash\",\"1500.00\",\"\",\"6000.00\"],[\"14-Dec-2016\",\"WDL-Cash\",\"\",\"2000.00\",\"4000.00\"],[\"13-Dec-2016\",\"FT-Other Bank\",\"\",\"2000.00\",\"2000.00\"],[\"12-Dec-2016\",\"DEP-Personal A/C\",\"7000.00\",\"\",\"9000.00\"]]}";
            case 8:
                return "{\"accountName\":\"MD Arif Gazi\",\"accountNumber\":\"2001158500126\",\"agentName\":\"BADRUL ALOM\",\"balanceAmount\":\"BDT 80,550.00\",\"balanceAmountInWords\":\"EIGHTY THOUSAND FIVE HUNDRED FIFTY ONLY\",\"boothAddress\":\"VAIRAB BAZAR, CHOWDHURYR HAT, SONAGAZI\",\"charge\":\"BDT 7.50\",\"customerAddress\":\"GREEN GADEN BUILDING, FLAT- D4, HOUSE- 12, ROAD- 10, BLOCK- C, MIRPUR, PS- MIRPUR, DHAKA\",\"customerId\":\"CB1158500\",\"customerName\":\"Md. Arif Gazi\",\"depositAmountInWords\":\"THREE THOUSAND ONLY\",\"depositAmount\":\"BDT 3,000.00\",\"dpsAccountType\":\"DPS\",\"linkAccountNumber\":\"2005246987526\",\"maturityAmount\":\"BDT 2,26,047.00\",\"maturityDate\":\"19-JAN-2021\",\"mobileNo\":\"01617877595\",\"principalAmount\":\"BDT 1,00,000.00\",\"printDate\":\"19-JAN-2016 13:13:15 PM\",\"productTenor\":\"5 Years\",\"profitRate\":\"8.85% (Yearly)\",\"receiverAccountName\":\"SUJON PATWARY\",\"requestId\":\"12346\",\"termDepositAccountType\":\"TERM DEPOSIT\",\"transactionDate\":\"19-JAN-2016\",\"savingsAccountType\":\"Savings\",\"transactionCode\":\"TR222369\",\"userId\":\"615001001 (NAIM ISLAM)\",\"withdrawAmount\":\"BDT 3,000.00 + 7.5 (Charge)\",\"withdrawsAmountInWords\":\"THREE THOUSAND SEVEN TAKA FIFTY PAISA ONLY\",\"cardType\":\"ATM\",\"cardBrand\":\"VISA\",\"cardNumber\":\"1234 1234 1234 1234\",\"noOfLeave\":\"10\",\"chequeLeafNumber\":\"123 456 789 123\",\"chequeAmount\":\"BDT 10,000.00\",\"receiverName\":\"Asadul Haque\",\"chequeLostReason\":\"Lost\",\"retrieveFrom\":\"From Lost\",\"photo\":\"\",\"statement\":[[\"Date\",\"Description\",\"Deposit\",\"Withdraw\",\"Balance\"],[\"15-Dec-2016\",\"FT-School Fee\",\"\",\"500.00\",\"4500.00\"],[\"14-Dec-2016\",\"DEP Cash\",\"1500.00\",\"\",\"6000.00\"],[\"14-Dec-2016\",\"WDL-Cash\",\"\",\"2000.00\",\"4000.00\"],[\"13-Dec-2016\",\"FT-Other Bank\",\"\",\"2000.00\",\"2000.00\"],[\"12-Dec-2016\",\"DEP-Personal A/C\",\"7000.00\",\"\",\"9000.00\"]]}";
            case 9:
                return "{\"accountName\":\"MD Arif Gazi\",\"accountNumber\":\"2001158500126\",\"agentName\":\"BADRUL ALOM\",\"balanceAmount\":\"BDT 80,550.00\",\"balanceAmountInWords\":\"EIGHTY THOUSAND FIVE HUNDRED FIFTY ONLY\",\"boothAddress\":\"VAIRAB BAZAR, CHOWDHURYR HAT, SONAGAZI\",\"charge\":\"BDT 7.50\",\"customerAddress\":\"GREEN GADEN BUILDING, FLAT- D4, HOUSE- 12, ROAD- 10, BLOCK- C, MIRPUR, PS- MIRPUR, DHAKA\",\"customerId\":\"CB1158500\",\"customerName\":\"Md. Arif Gazi\",\"depositAmountInWords\":\"THREE THOUSAND ONLY\",\"depositAmount\":\"BDT 3,000.00\",\"dpsAccountType\":\"DPS\",\"linkAccountNumber\":\"2005246987526\",\"maturityAmount\":\"BDT 2,26,047.00\",\"maturityDate\":\"19-JAN-2021\",\"mobileNo\":\"01617877595\",\"principalAmount\":\"BDT 1,00,000.00\",\"printDate\":\"19-JAN-2016 13:13:15 PM\",\"productTenor\":\"5 Years\",\"profitRate\":\"8.85% (Yearly)\",\"receiverAccountName\":\"SUJON PATWARY\",\"requestId\":\"12346\",\"termDepositAccountType\":\"TERM DEPOSIT\",\"transactionDate\":\"19-JAN-2016\",\"savingsAccountType\":\"Savings\",\"transactionCode\":\"TR222369\",\"userId\":\"615001001 (NAIM ISLAM)\",\"withdrawAmount\":\"BDT 3,000.00 + 7.5 (Charge)\",\"withdrawsAmountInWords\":\"THREE THOUSAND SEVEN TAKA FIFTY PAISA ONLY\",\"cardType\":\"ATM\",\"cardBrand\":\"VISA\",\"cardNumber\":\"1234 1234 1234 1234\",\"noOfLeave\":\"10\",\"chequeLeafNumber\":\"123 456 789 123\",\"chequeAmount\":\"BDT 10,000.00\",\"receiverName\":\"Asadul Haque\",\"chequeLostReason\":\"Lost\",\"retrieveFrom\":\"From Lost\",\"photo\":\"\",\"statement\":[[\"Date\",\"Description\",\"Deposit\",\"Withdraw\",\"Balance\"],[\"15-Dec-2016\",\"FT-School Fee\",\"\",\"500.00\",\"4500.00\"],[\"14-Dec-2016\",\"DEP Cash\",\"1500.00\",\"\",\"6000.00\"],[\"14-Dec-2016\",\"WDL-Cash\",\"\",\"2000.00\",\"4000.00\"],[\"13-Dec-2016\",\"FT-Other Bank\",\"\",\"2000.00\",\"2000.00\"],[\"12-Dec-2016\",\"DEP-Personal A/C\",\"7000.00\",\"\",\"9000.00\"]]}";
            case 10:
                return "{\"accountName\":\"MD Arif Gazi\",\"accountNumber\":\"2001158500126\",\"agentName\":\"BADRUL ALOM\",\"balanceAmount\":\"BDT 80,550.00\",\"balanceAmountInWords\":\"EIGHTY THOUSAND FIVE HUNDRED FIFTY ONLY\",\"boothAddress\":\"VAIRAB BAZAR, CHOWDHURYR HAT, SONAGAZI\",\"charge\":\"BDT 7.50\",\"customerAddress\":\"GREEN GADEN BUILDING, FLAT- D4, HOUSE- 12, ROAD- 10, BLOCK- C, MIRPUR, PS- MIRPUR, DHAKA\",\"customerId\":\"CB1158500\",\"customerName\":\"Md. Arif Gazi\",\"depositAmountInWords\":\"THREE THOUSAND ONLY\",\"depositAmount\":\"BDT 3,000.00\",\"dpsAccountType\":\"DPS\",\"linkAccountNumber\":\"2005246987526\",\"maturityAmount\":\"BDT 2,26,047.00\",\"maturityDate\":\"19-JAN-2021\",\"mobileNo\":\"01617877595\",\"principalAmount\":\"BDT 1,00,000.00\",\"printDate\":\"19-JAN-2016 13:13:15 PM\",\"productTenor\":\"5 Years\",\"profitRate\":\"8.85% (Yearly)\",\"receiverAccountName\":\"SUJON PATWARY\",\"requestId\":\"12346\",\"termDepositAccountType\":\"TERM DEPOSIT\",\"transactionDate\":\"19-JAN-2016\",\"savingsAccountType\":\"Savings\",\"transactionCode\":\"TR222369\",\"userId\":\"615001001 (NAIM ISLAM)\",\"withdrawAmount\":\"BDT 3,000.00 + 7.5 (Charge)\",\"withdrawsAmountInWords\":\"THREE THOUSAND SEVEN TAKA FIFTY PAISA ONLY\",\"cardType\":\"ATM\",\"cardBrand\":\"VISA\",\"cardNumber\":\"1234 1234 1234 1234\",\"noOfLeave\":\"10\",\"chequeLeafNumber\":\"123 456 789 123\",\"chequeAmount\":\"BDT 10,000.00\",\"receiverName\":\"Asadul Haque\",\"chequeLostReason\":\"Lost\",\"retrieveFrom\":\"From Lost\",\"photo\":\"\",\"statement\":[[\"Date\",\"Description\",\"Deposit\",\"Withdraw\",\"Balance\"],[\"15-Dec-2016\",\"FT-School Fee\",\"\",\"500.00\",\"4500.00\"],[\"14-Dec-2016\",\"DEP Cash\",\"1500.00\",\"\",\"6000.00\"],[\"14-Dec-2016\",\"WDL-Cash\",\"\",\"2000.00\",\"4000.00\"],[\"13-Dec-2016\",\"FT-Other Bank\",\"\",\"2000.00\",\"2000.00\"],[\"12-Dec-2016\",\"DEP-Personal A/C\",\"7000.00\",\"\",\"9000.00\"]]}";
            case 11:
                return "{\"accountName\":\"MD Arif Gazi\",\"accountNumber\":\"2001158500126\",\"agentName\":\"BADRUL ALOM\",\"balanceAmount\":\"BDT 80,550.00\",\"balanceAmountInWords\":\"EIGHTY THOUSAND FIVE HUNDRED FIFTY ONLY\",\"boothAddress\":\"VAIRAB BAZAR, CHOWDHURYR HAT, SONAGAZI\",\"charge\":\"BDT 7.50\",\"customerAddress\":\"GREEN GADEN BUILDING, FLAT- D4, HOUSE- 12, ROAD- 10, BLOCK- C, MIRPUR, PS- MIRPUR, DHAKA\",\"customerId\":\"CB1158500\",\"customerName\":\"Md. Arif Gazi\",\"depositAmountInWords\":\"THREE THOUSAND ONLY\",\"depositAmount\":\"BDT 3,000.00\",\"dpsAccountType\":\"DPS\",\"linkAccountNumber\":\"2005246987526\",\"maturityAmount\":\"BDT 2,26,047.00\",\"maturityDate\":\"19-JAN-2021\",\"mobileNo\":\"01617877595\",\"principalAmount\":\"BDT 1,00,000.00\",\"printDate\":\"19-JAN-2016 13:13:15 PM\",\"productTenor\":\"5 Years\",\"profitRate\":\"8.85% (Yearly)\",\"receiverAccountName\":\"SUJON PATWARY\",\"requestId\":\"12346\",\"termDepositAccountType\":\"TERM DEPOSIT\",\"transactionDate\":\"19-JAN-2016\",\"savingsAccountType\":\"Savings\",\"transactionCode\":\"TR222369\",\"userId\":\"615001001 (NAIM ISLAM)\",\"withdrawAmount\":\"BDT 3,000.00 + 7.5 (Charge)\",\"withdrawsAmountInWords\":\"THREE THOUSAND SEVEN TAKA FIFTY PAISA ONLY\",\"cardType\":\"ATM\",\"cardBrand\":\"VISA\",\"cardNumber\":\"1234 1234 1234 1234\",\"noOfLeave\":\"10\",\"chequeLeafNumber\":\"123 456 789 123\",\"chequeAmount\":\"BDT 10,000.00\",\"receiverName\":\"Asadul Haque\",\"chequeLostReason\":\"Lost\",\"retrieveFrom\":\"From Lost\",\"photo\":\"\",\"statement\":[[\"Date\",\"Description\",\"Deposit\",\"Withdraw\",\"Balance\"],[\"15-Dec-2016\",\"FT-School Fee\",\"\",\"500.00\",\"4500.00\"],[\"14-Dec-2016\",\"DEP Cash\",\"1500.00\",\"\",\"6000.00\"],[\"14-Dec-2016\",\"WDL-Cash\",\"\",\"2000.00\",\"4000.00\"],[\"13-Dec-2016\",\"FT-Other Bank\",\"\",\"2000.00\",\"2000.00\"],[\"12-Dec-2016\",\"DEP-Personal A/C\",\"7000.00\",\"\",\"9000.00\"]]}";
            case 12:
                return "{\"accountName\":\"MD Arif Gazi\",\"accountNumber\":\"2001158500126\",\"agentName\":\"BADRUL ALOM\",\"balanceAmount\":\"BDT 80,550.00\",\"balanceAmountInWords\":\"EIGHTY THOUSAND FIVE HUNDRED FIFTY ONLY\",\"boothAddress\":\"VAIRAB BAZAR, CHOWDHURYR HAT, SONAGAZI\",\"charge\":\"BDT 7.50\",\"customerAddress\":\"GREEN GADEN BUILDING, FLAT- D4, HOUSE- 12, ROAD- 10, BLOCK- C, MIRPUR, PS- MIRPUR, DHAKA\",\"customerId\":\"CB1158500\",\"customerName\":\"Md. Arif Gazi\",\"depositAmountInWords\":\"THREE THOUSAND ONLY\",\"depositAmount\":\"BDT 3,000.00\",\"dpsAccountType\":\"DPS\",\"linkAccountNumber\":\"2005246987526\",\"maturityAmount\":\"BDT 2,26,047.00\",\"maturityDate\":\"19-JAN-2021\",\"mobileNo\":\"01617877595\",\"principalAmount\":\"BDT 1,00,000.00\",\"printDate\":\"19-JAN-2016 13:13:15 PM\",\"productTenor\":\"5 Years\",\"profitRate\":\"8.85% (Yearly)\",\"receiverAccountName\":\"SUJON PATWARY\",\"requestId\":\"12346\",\"termDepositAccountType\":\"TERM DEPOSIT\",\"transactionDate\":\"19-JAN-2016\",\"savingsAccountType\":\"Savings\",\"transactionCode\":\"TR222369\",\"userId\":\"615001001 (NAIM ISLAM)\",\"withdrawAmount\":\"BDT 3,000.00 + 7.5 (Charge)\",\"withdrawsAmountInWords\":\"THREE THOUSAND SEVEN TAKA FIFTY PAISA ONLY\",\"cardType\":\"ATM\",\"cardBrand\":\"VISA\",\"cardNumber\":\"1234 1234 1234 1234\",\"noOfLeave\":\"10\",\"chequeLeafNumber\":\"123 456 789 123\",\"chequeAmount\":\"BDT 10,000.00\",\"receiverName\":\"Asadul Haque\",\"chequeLostReason\":\"Lost\",\"retrieveFrom\":\"From Lost\",\"photo\":\"\",\"statement\":[[\"Date\",\"Description\",\"Deposit\",\"Withdraw\",\"Balance\"],[\"15-Dec-2016\",\"FT-School Fee\",\"\",\"500.00\",\"4500.00\"],[\"14-Dec-2016\",\"DEP Cash\",\"1500.00\",\"\",\"6000.00\"],[\"14-Dec-2016\",\"WDL-Cash\",\"\",\"2000.00\",\"4000.00\"],[\"13-Dec-2016\",\"FT-Other Bank\",\"\",\"2000.00\",\"2000.00\"],[\"12-Dec-2016\",\"DEP-Personal A/C\",\"7000.00\",\"\",\"9000.00\"]]}";
            case 13:
                return "{\"accountName\":\"MD Arif Gazi\",\"accountNumber\":\"2001158500126\",\"agentName\":\"BADRUL ALOM\",\"balanceAmount\":\"BDT 80,550.00\",\"balanceAmountInWords\":\"EIGHTY THOUSAND FIVE HUNDRED FIFTY ONLY\",\"boothAddress\":\"VAIRAB BAZAR, CHOWDHURYR HAT, SONAGAZI\",\"charge\":\"BDT 7.50\",\"customerAddress\":\"GREEN GADEN BUILDING, FLAT- D4, HOUSE- 12, ROAD- 10, BLOCK- C, MIRPUR, PS- MIRPUR, DHAKA\",\"customerId\":\"CB1158500\",\"customerName\":\"Md. Arif Gazi\",\"depositAmountInWords\":\"THREE THOUSAND ONLY\",\"depositAmount\":\"BDT 3,000.00\",\"dpsAccountType\":\"DPS\",\"linkAccountNumber\":\"2005246987526\",\"maturityAmount\":\"BDT 2,26,047.00\",\"maturityDate\":\"19-JAN-2021\",\"mobileNo\":\"01617877595\",\"principalAmount\":\"BDT 1,00,000.00\",\"printDate\":\"19-JAN-2016 13:13:15 PM\",\"productTenor\":\"5 Years\",\"profitRate\":\"8.85% (Yearly)\",\"receiverAccountName\":\"SUJON PATWARY\",\"requestId\":\"12346\",\"termDepositAccountType\":\"TERM DEPOSIT\",\"transactionDate\":\"19-JAN-2016\",\"savingsAccountType\":\"Savings\",\"transactionCode\":\"TR222369\",\"userId\":\"615001001 (NAIM ISLAM)\",\"withdrawAmount\":\"BDT 3,000.00 + 7.5 (Charge)\",\"withdrawsAmountInWords\":\"THREE THOUSAND SEVEN TAKA FIFTY PAISA ONLY\",\"cardType\":\"ATM\",\"cardBrand\":\"VISA\",\"cardNumber\":\"1234 1234 1234 1234\",\"noOfLeave\":\"10\",\"chequeLeafNumber\":\"123 456 789 123\",\"chequeAmount\":\"BDT 10,000.00\",\"receiverName\":\"Asadul Haque\",\"chequeLostReason\":\"Lost\",\"retrieveFrom\":\"From Lost\",\"photo\":\"\",\"statement\":[[\"Date\",\"Description\",\"Deposit\",\"Withdraw\",\"Balance\"],[\"15-Dec-2016\",\"FT-School Fee\",\"\",\"500.00\",\"4500.00\"],[\"14-Dec-2016\",\"DEP Cash\",\"1500.00\",\"\",\"6000.00\"],[\"14-Dec-2016\",\"WDL-Cash\",\"\",\"2000.00\",\"4000.00\"],[\"13-Dec-2016\",\"FT-Other Bank\",\"\",\"2000.00\",\"2000.00\"],[\"12-Dec-2016\",\"DEP-Personal A/C\",\"7000.00\",\"\",\"9000.00\"]]}";
            case 14:
                return "{\"accountName\":\"MD Arif Gazi\",\"accountNumber\":\"2001158500126\",\"agentName\":\"BADRUL ALOM\",\"balanceAmount\":\"BDT 80,550.00\",\"balanceAmountInWords\":\"EIGHTY THOUSAND FIVE HUNDRED FIFTY ONLY\",\"boothAddress\":\"VAIRAB BAZAR, CHOWDHURYR HAT, SONAGAZI\",\"charge\":\"BDT 7.50\",\"customerAddress\":\"GREEN GADEN BUILDING, FLAT- D4, HOUSE- 12, ROAD- 10, BLOCK- C, MIRPUR, PS- MIRPUR, DHAKA\",\"customerId\":\"CB1158500\",\"customerName\":\"Md. Arif Gazi\",\"depositAmountInWords\":\"THREE THOUSAND ONLY\",\"depositAmount\":\"BDT 3,000.00\",\"dpsAccountType\":\"DPS\",\"linkAccountNumber\":\"2005246987526\",\"maturityAmount\":\"BDT 2,26,047.00\",\"maturityDate\":\"19-JAN-2021\",\"mobileNo\":\"01617877595\",\"principalAmount\":\"BDT 1,00,000.00\",\"printDate\":\"19-JAN-2016 13:13:15 PM\",\"productTenor\":\"5 Years\",\"profitRate\":\"8.85% (Yearly)\",\"receiverAccountName\":\"SUJON PATWARY\",\"requestId\":\"12346\",\"termDepositAccountType\":\"TERM DEPOSIT\",\"transactionDate\":\"19-JAN-2016\",\"savingsAccountType\":\"Savings\",\"transactionCode\":\"TR222369\",\"userId\":\"615001001 (NAIM ISLAM)\",\"withdrawAmount\":\"BDT 3,000.00 + 7.5 (Charge)\",\"withdrawsAmountInWords\":\"THREE THOUSAND SEVEN TAKA FIFTY PAISA ONLY\",\"cardType\":\"ATM\",\"cardBrand\":\"VISA\",\"cardNumber\":\"1234 1234 1234 1234\",\"noOfLeave\":\"10\",\"chequeLeafNumber\":\"123 456 789 123\",\"chequeAmount\":\"BDT 10,000.00\",\"receiverName\":\"Asadul Haque\",\"chequeLostReason\":\"Lost\",\"retrieveFrom\":\"From Lost\",\"photo\":\"\",\"statement\":[[\"Date\",\"Description\",\"Deposit\",\"Withdraw\",\"Balance\"],[\"15-Dec-2016\",\"FT-School Fee\",\"\",\"500.00\",\"4500.00\"],[\"14-Dec-2016\",\"DEP Cash\",\"1500.00\",\"\",\"6000.00\"],[\"14-Dec-2016\",\"WDL-Cash\",\"\",\"2000.00\",\"4000.00\"],[\"13-Dec-2016\",\"FT-Other Bank\",\"\",\"2000.00\",\"2000.00\"],[\"12-Dec-2016\",\"DEP-Personal A/C\",\"7000.00\",\"\",\"9000.00\"]]}";
            case 15:
                return "{\"accountName\":\"MD Arif Gazi\",\"accountNumber\":\"2001158500126\",\"agentName\":\"BADRUL ALOM\",\"balanceAmount\":\"BDT 80,550.00\",\"balanceAmountInWords\":\"EIGHTY THOUSAND FIVE HUNDRED FIFTY ONLY\",\"boothAddress\":\"VAIRAB BAZAR, CHOWDHURYR HAT, SONAGAZI\",\"charge\":\"BDT 7.50\",\"customerAddress\":\"GREEN GADEN BUILDING, FLAT- D4, HOUSE- 12, ROAD- 10, BLOCK- C, MIRPUR, PS- MIRPUR, DHAKA\",\"customerId\":\"CB1158500\",\"customerName\":\"Md. Arif Gazi\",\"depositAmountInWords\":\"THREE THOUSAND ONLY\",\"depositAmount\":\"BDT 3,000.00\",\"dpsAccountType\":\"DPS\",\"linkAccountNumber\":\"2005246987526\",\"maturityAmount\":\"BDT 2,26,047.00\",\"maturityDate\":\"19-JAN-2021\",\"mobileNo\":\"01617877595\",\"principalAmount\":\"BDT 1,00,000.00\",\"printDate\":\"19-JAN-2016 13:13:15 PM\",\"productTenor\":\"5 Years\",\"profitRate\":\"8.85% (Yearly)\",\"receiverAccountName\":\"SUJON PATWARY\",\"requestId\":\"12346\",\"termDepositAccountType\":\"TERM DEPOSIT\",\"transactionDate\":\"19-JAN-2016\",\"savingsAccountType\":\"Savings\",\"transactionCode\":\"TR222369\",\"userId\":\"615001001 (NAIM ISLAM)\",\"withdrawAmount\":\"BDT 3,000.00 + 7.5 (Charge)\",\"withdrawsAmountInWords\":\"THREE THOUSAND SEVEN TAKA FIFTY PAISA ONLY\",\"cardType\":\"ATM\",\"cardBrand\":\"VISA\",\"cardNumber\":\"1234 1234 1234 1234\",\"noOfLeave\":\"10\",\"chequeLeafNumber\":\"123 456 789 123\",\"chequeAmount\":\"BDT 10,000.00\",\"receiverName\":\"Asadul Haque\",\"chequeLostReason\":\"Lost\",\"retrieveFrom\":\"From Lost\",\"photo\":\"\",\"statement\":[[\"Date\",\"Description\",\"Deposit\",\"Withdraw\",\"Balance\"],[\"15-Dec-2016\",\"FT-School Fee\",\"\",\"500.00\",\"4500.00\"],[\"14-Dec-2016\",\"DEP Cash\",\"1500.00\",\"\",\"6000.00\"],[\"14-Dec-2016\",\"WDL-Cash\",\"\",\"2000.00\",\"4000.00\"],[\"13-Dec-2016\",\"FT-Other Bank\",\"\",\"2000.00\",\"2000.00\"],[\"12-Dec-2016\",\"DEP-Personal A/C\",\"7000.00\",\"\",\"9000.00\"]]}";
            case 16:
                return "{\"accountName\":\"MD Arif Gazi\",\"accountNumber\":\"2001158500126\",\"agentName\":\"BADRUL ALOM\",\"balanceAmount\":\"BDT 80,550.00\",\"balanceAmountInWords\":\"EIGHTY THOUSAND FIVE HUNDRED FIFTY ONLY\",\"boothAddress\":\"VAIRAB BAZAR, CHOWDHURYR HAT, SONAGAZI\",\"charge\":\"BDT 7.50\",\"customerAddress\":\"GREEN GADEN BUILDING, FLAT- D4, HOUSE- 12, ROAD- 10, BLOCK- C, MIRPUR, PS- MIRPUR, DHAKA\",\"customerId\":\"CB1158500\",\"customerName\":\"Md. Arif Gazi\",\"depositAmountInWords\":\"THREE THOUSAND ONLY\",\"depositAmount\":\"BDT 3,000.00\",\"dpsAccountType\":\"DPS\",\"linkAccountNumber\":\"2005246987526\",\"maturityAmount\":\"BDT 2,26,047.00\",\"maturityDate\":\"19-JAN-2021\",\"mobileNo\":\"01617877595\",\"principalAmount\":\"BDT 1,00,000.00\",\"printDate\":\"19-JAN-2016 13:13:15 PM\",\"productTenor\":\"5 Years\",\"profitRate\":\"8.85% (Yearly)\",\"receiverAccountName\":\"SUJON PATWARY\",\"requestId\":\"12346\",\"termDepositAccountType\":\"TERM DEPOSIT\",\"transactionDate\":\"19-JAN-2016\",\"savingsAccountType\":\"Savings\",\"transactionCode\":\"TR222369\",\"userId\":\"615001001 (NAIM ISLAM)\",\"withdrawAmount\":\"BDT 3,000.00 + 7.5 (Charge)\",\"withdrawsAmountInWords\":\"THREE THOUSAND SEVEN TAKA FIFTY PAISA ONLY\",\"cardType\":\"ATM\",\"cardBrand\":\"VISA\",\"cardNumber\":\"1234 1234 1234 1234\",\"noOfLeave\":\"10\",\"chequeLeafNumber\":\"123 456 789 123\",\"chequeAmount\":\"BDT 10,000.00\",\"receiverName\":\"Asadul Haque\",\"chequeLostReason\":\"Lost\",\"retrieveFrom\":\"From Lost\",\"photo\":\"\",\"statement\":[[\"Date\",\"Description\",\"Deposit\",\"Withdraw\",\"Balance\"],[\"15-Dec-2016\",\"FT-School Fee\",\"\",\"500.00\",\"4500.00\"],[\"14-Dec-2016\",\"DEP Cash\",\"1500.00\",\"\",\"6000.00\"],[\"14-Dec-2016\",\"WDL-Cash\",\"\",\"2000.00\",\"4000.00\"],[\"13-Dec-2016\",\"FT-Other Bank\",\"\",\"2000.00\",\"2000.00\"],[\"12-Dec-2016\",\"DEP-Personal A/C\",\"7000.00\",\"\",\"9000.00\"]]}";
            case 17:
                return "{\"accountName\":\"MD Arif Gazi\",\"accountNumber\":\"2001158500126\",\"agentName\":\"BADRUL ALOM\",\"balanceAmount\":\"BDT 80,550.00\",\"balanceAmountInWords\":\"EIGHTY THOUSAND FIVE HUNDRED FIFTY ONLY\",\"boothAddress\":\"VAIRAB BAZAR, CHOWDHURYR HAT, SONAGAZI\",\"charge\":\"BDT 7.50\",\"customerAddress\":\"GREEN GADEN BUILDING, FLAT- D4, HOUSE- 12, ROAD- 10, BLOCK- C, MIRPUR, PS- MIRPUR, DHAKA\",\"customerId\":\"CB1158500\",\"customerName\":\"Md. Arif Gazi\",\"depositAmountInWords\":\"THREE THOUSAND ONLY\",\"depositAmount\":\"BDT 3,000.00\",\"dpsAccountType\":\"DPS\",\"linkAccountNumber\":\"2005246987526\",\"maturityAmount\":\"BDT 2,26,047.00\",\"maturityDate\":\"19-JAN-2021\",\"mobileNo\":\"01617877595\",\"principalAmount\":\"BDT 1,00,000.00\",\"printDate\":\"19-JAN-2016 13:13:15 PM\",\"productTenor\":\"5 Years\",\"profitRate\":\"8.85% (Yearly)\",\"receiverAccountName\":\"SUJON PATWARY\",\"requestId\":\"12346\",\"termDepositAccountType\":\"TERM DEPOSIT\",\"transactionDate\":\"19-JAN-2016\",\"savingsAccountType\":\"Savings\",\"transactionCode\":\"TR222369\",\"userId\":\"615001001 (NAIM ISLAM)\",\"withdrawAmount\":\"BDT 3,000.00 + 7.5 (Charge)\",\"withdrawsAmountInWords\":\"THREE THOUSAND SEVEN TAKA FIFTY PAISA ONLY\",\"cardType\":\"ATM\",\"cardBrand\":\"VISA\",\"cardNumber\":\"1234 1234 1234 1234\",\"noOfLeave\":\"10\",\"chequeLeafNumber\":\"123 456 789 123\",\"chequeAmount\":\"BDT 10,000.00\",\"receiverName\":\"Asadul Haque\",\"chequeLostReason\":\"Lost\",\"retrieveFrom\":\"From Lost\",\"photo\":\"\",\"statement\":[[\"Date\",\"Description\",\"Deposit\",\"Withdraw\",\"Balance\"],[\"15-Dec-2016\",\"FT-School Fee\",\"\",\"500.00\",\"4500.00\"],[\"14-Dec-2016\",\"DEP Cash\",\"1500.00\",\"\",\"6000.00\"],[\"14-Dec-2016\",\"WDL-Cash\",\"\",\"2000.00\",\"4000.00\"],[\"13-Dec-2016\",\"FT-Other Bank\",\"\",\"2000.00\",\"2000.00\"],[\"12-Dec-2016\",\"DEP-Personal A/C\",\"7000.00\",\"\",\"9000.00\"]]}";
            case 18:
                return "{\"agentName\":\"BADRUL ALOM\",\"userId\":\"615001001 (NAIM ISLAM)\",\"boothAddress\":\"VAIRAB BAZAR, CHOWDHURYR HAT, SONAGAZI\",\"customerName\":\"Md. Arif Gazi\",\"mobileNo\":\"01617877595\",\"exchangeHouse\":\"\",\"senderName\":\"Toufiq\",\"senderCountry\":\"Italy\",\"pinNo\":\"123456\",\"apprxAmount\":\"1,000 BDT\",\"iDType\":\"NID\",\"iDNumber\":\"123456789\",\"amountInWords\":\"ONE TOUSAND ONLY\",\"printDate\":\"19-JAN-2016 13:13:15 PM\",\"requestId\":\"123456\",\"photo\":\"\"}";
            case 19:
                return "{\"agentName\":\"BADRUL ALOM\",\"userId\":\"615001001 (NAIM ISLAM)\",\"boothAddress\":\"VAIRAB BAZAR, CHOWDHURYR HAT, SONAGAZI\",\"customerName\":\"Md. Arif Gazi\",\"mobileNo\":\"01617877595\",\"exchangeHouse\":\"\",\"senderName\":\"Toufiq\",\"senderCountry\":\"Italy\",\"pinNo\":\"123456\",\"payableAmount\":\"1,000 BDT\",\"transactionCode\":\"123456\",\"currency\":\"Euro\",\"exchangeRate\":\"100\",\"fxAmount\":\"\",\"printDate\":\"19-JAN-2016 13:13:15 PM\",\"amountInWords\":\"ONE TOUSAND ONLY\",\"requestId\":\"123456\",\"photo\":\"\"}";
            default:
                return "{\"accountName\":\"MD Arif Gazi\",\"accountNumber\":\"2001158500126\",\"agentName\":\"BADRUL ALOM\",\"balanceAmount\":\"BDT 80,550.00\",\"balanceAmountInWords\":\"EIGHTY THOUSAND FIVE HUNDRED FIFTY ONLY\",\"boothAddress\":\"VAIRAB BAZAR, CHOWDHURYR HAT, SONAGAZI\",\"charge\":\"BDT 7.50\",\"customerAddress\":\"GREEN GADEN BUILDING, FLAT- D4, HOUSE- 12, ROAD- 10, BLOCK- C, MIRPUR, PS- MIRPUR, DHAKA\",\"customerId\":\"CB1158500\",\"customerName\":\"Md. Arif Gazi\",\"depositAmountInWords\":\"THREE THOUSAND ONLY\",\"depositAmount\":\"BDT 3,000.00\",\"dpsAccountType\":\"DPS\",\"linkAccountNumber\":\"2005246987526\",\"maturityAmount\":\"BDT 2,26,047.00\",\"maturityDate\":\"19-JAN-2021\",\"mobileNo\":\"01617877595\",\"principalAmount\":\"BDT 1,00,000.00\",\"printDate\":\"19-JAN-2016 13:13:15 PM\",\"productTenor\":\"5 Years\",\"profitRate\":\"8.85% (Yearly)\",\"receiverAccountName\":\"SUJON PATWARY\",\"requestId\":\"12346\",\"termDepositAccountType\":\"TERM DEPOSIT\",\"transactionDate\":\"19-JAN-2016\",\"savingsAccountType\":\"Savings\",\"transactionCode\":\"TR222369\",\"userId\":\"615001001 (NAIM ISLAM)\",\"withdrawAmount\":\"BDT 3,000.00 + 7.5 (Charge)\",\"withdrawsAmountInWords\":\"THREE THOUSAND SEVEN TAKA FIFTY PAISA ONLY\",\"cardType\":\"ATM\",\"cardBrand\":\"VISA\",\"cardNumber\":\"1234 1234 1234 1234\",\"noOfLeave\":\"10\",\"chequeLeafNumber\":\"123 456 789 123\",\"chequeAmount\":\"BDT 10,000.00\",\"receiverName\":\"Asadul Haque\",\"chequeLostReason\":\"Lost\",\"retrieveFrom\":\"From Lost\",\"photo\":\"\",\"statement\":[[\"Date\",\"Description\",\"Deposit\",\"Withdraw\",\"Balance\"],[\"15-Dec-2016\",\"FT-School Fee\",\"\",\"500.00\",\"4500.00\"],[\"14-Dec-2016\",\"DEP Cash\",\"1500.00\",\"\",\"6000.00\"],[\"14-Dec-2016\",\"WDL-Cash\",\"\",\"2000.00\",\"4000.00\"],[\"13-Dec-2016\",\"FT-Other Bank\",\"\",\"2000.00\",\"2000.00\"],[\"12-Dec-2016\",\"DEP-Personal A/C\",\"7000.00\",\"\",\"9000.00\"]]}";
        }
    }
}