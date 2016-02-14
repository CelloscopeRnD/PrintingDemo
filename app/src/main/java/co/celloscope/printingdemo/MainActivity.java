package co.celloscope.printingdemo;

import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.AsyncTask;
import android.os.Bundle;
import android.print.PrintJobInfo;
import android.support.v7.app.AppCompatActivity;
import android.widget.TextView;

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
    private WebViewPrint webViewPrint;
    private TextView statusTextView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        statusTextView = (TextView) findViewById(R.id.statusTextView);

        try {
            createPhoto();
            webViewPrint = new WebViewPrint(MainActivity.this);
            webViewPrint.print(getHtmlFile());

        } catch (IOException e) {
            e.printStackTrace();
        } catch (JSONException e) {
            e.printStackTrace();
        }
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
            FileHelper.createPhotoInExternalCacheDirectory(MainActivity.this, b, "photo.png");
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
                    test();
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

    private void test() {
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
                test();
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
                test();
                break;
            case PrintJobInfo.STATE_STARTED:
                statusTextView.post(new Runnable() {
                    public void run() {
                        statusTextView.setText(R.string.printingStarted);
                    }
                });
                test();
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
        String receiptType = getReceiptType();
        String jsonData = getJsonString();
        String[] values = {
                receiptType != null ? receiptType : "1",
                jsonData != null ? jsonData : getDummyJsonString()
        };
        return new HtmlHelper(this).getHtml(TEMPLATE_HTML, keys, values);
    }

    private String getReceiptType() {
        return this.getIntent().getStringExtra(RECEIPT_TYPE);
    }

    private String getJsonString() {
        return this.getIntent().getStringExtra(JSON_DATA);
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

    private String getDummyJsonString() {
        return "{ \"accountName\": \"MD Arif Gazi\", \"accountNumber\": \"2001158500126\", \"agentName\": \"BADRUL ALOM\", \"balanceAmount\": \"BDT 80,550.00\", \"balanceAmountInWords\": \"EIGHTY THOUSAND FIVE HUNDRED FIFTY ONLY\", \"boothAddress\": \"VAIRAB BAZAR, CHOWDHURYR HAT, SONAGAZI\", \"charge\": \"BDT 7.50\", \"customerAddress\": \"GREEN GADEN BUILDING, FLAT- D4, HOUSE- 12, ROAD- 10, BLOCK- C, MIRPUR, PS- MIRPUR, DHAKA\", \"customerId\": \"CB1158500\", \"customerName\": \"Md. Arif Gazi\", \"depositAmountInWords\": \"THREE THOUSAND ONLY\", \"depositAmount\": \"BDT 3,000.00\", \"dpsAccountType\": \"DPS\", \"linkAccountNumber\": \"2005246987526\", \"maturityAmount\": \"BDT 2,26,047.00\", \"maturityDate\": \"19-JAN-2021\", \"mobileNo\": \"01617877595\", \"principalAmount\": \"BDT 1,00,000.00\", \"printDate\": \"19-JAN-2016 13:13:15 PM\", \"productTenor\": \"5 Years\", \"profitRate\": \"8.85% (Yearly)\", \"receiverAccountName\": \"SUJON PATWARY\", \"termDepositAccountType\": \"TERM DEPOSIT\", \"transactionDate\": \"19-JAN-2016\", \"savingsAccountType\": \"Savings\", \"transactionCode\": \"TR222369\", \"userId\": \"615001001 (NAIM ISLAM)\", \"withdrawAmount\": \"BDT 3,000.00 + 7.5 (Charge)\", \"withdrawsAmountInWords\": \"THREE THOUSAND SEVEN TAKA FIFTY PAISA ONLY\", \"photo\": \"\" }";
    }
}