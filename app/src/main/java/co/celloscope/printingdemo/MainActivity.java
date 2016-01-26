package co.celloscope.printingdemo;

import android.os.AsyncTask;
import android.os.Bundle;
import android.print.PrintJob;
import android.print.PrintJobInfo;
import android.support.v7.app.AppCompatActivity;
import android.widget.TextView;

import java.io.File;
import java.io.IOException;

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
            webViewPrint = new WebViewPrint(MainActivity.this);
            webViewPrint.print(getHtmlFile());

        } catch (IOException e) {
            e.printStackTrace();
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

    private void test() {
        int state = webViewPrint.getState();
        switch (state) {
            case PrintJobInfo.STATE_BLOCKED:
                finish();
                break;
            case PrintJobInfo.STATE_CANCELED:
                finish();
                break;
            case PrintJobInfo.STATE_COMPLETED:
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
        String receiptType = this.getIntent().getStringExtra(RECEIPT_TYPE);
        String jsonData = this.getIntent().getStringExtra(JSON_DATA);
        String[] values = {
                receiptType != null ? receiptType : "1",
                jsonData != null ? jsonData : "{ \"accountName\": \"MD Arif Gazi\", \"accountNumber\": \"2001158500126\", \"agentName\": \"BADRUL ALOM\", \"balanceAmount\": \"BDT 80,550.00\", \"balanceAmountInWords\": \"EIGHTY THOUSAND FIVE HUNDRED FIFTY ONLY\", \"boothAddress\": \"VAIRAB BAZAR, CHOWDHURYR HAT, SONAGAZI\", \"charge\": \"BDT 7.50\", \"customerAddress\": \"GREEN GADEN BUILDING, FLAT- D4, HOUSE- 12, ROAD- 10, BLOCK- C, MIRPUR, PS- MIRPUR, DHAKA\", \"customerId\": \"CB1158500\", \"customerName\": \"Md. Arif Gazi\", \"depositAmountInWords\": \"THREE THOUSAND ONLY\", \"depositAmount\": \"BDT 3,000.00\", \"dpsAccountType\": \"DPS\", \"linkAccountNumber\": \"2005246987526\", \"maturityAmount\": \"BDT 2,26,047.00\", \"maturityDate\": \"19-JAN-2021\", \"mobileNo\": \"01617877595\", \"principalAmount\": \"BDT 1,00,000.00\", \"printDate\": \"19-JAN-2016 13:13:15 PM\", \"productTenor\": \"5 Years\", \"profitRate\": \"8.85% (Yearly)\", \"receiverAccountName\": \"SUJON PATWARY\", \"termDepositAccountType\": \"TERM DEPOSIT\", \"transactionDate\": \"19-JAN-2016\", \"savingsAccountType\": \"Savings\", \"transactionCode\": \"TR222369\", \"userId\": \"615001001 (NAIM ISLAM)\", \"withdrawAmount\": \"BDT 3,000.00 + 7.5 (Charge)\", \"withdrawsAmountInWords\": \"THREE THOUSAND SEVEN TAKA FIFTY PAISA ONLY\" }"
        };
        return new HtmlHelper(this).getHtml(TEMPLATE_HTML, keys, values);
    }
}