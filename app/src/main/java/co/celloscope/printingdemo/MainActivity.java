package co.celloscope.printingdemo;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Toast;

import java.io.File;
import java.io.IOException;

public class MainActivity extends AppCompatActivity {

    private enum Receipts {
        ACCOUNT_BALANCE("1"),
        CASH_DEPOSIT("2"),
        CASH_WITHDRAW("3"),
        DPS_ACCOUNT("4"),
        FIXED_DEPOSIT("5"),
        FUND_TRANSFER("6"),
        SAVINGS_ACCOUNT("7");

        private final String receiptNo;

        Receipts(String no) {
            this.receiptNo = no;
        }
    }


    private static final String RECEIPT_TYPE = "ReceiptType";
    private static final String JSON_DATA = "JsonData";

    private Receipts receipt = Receipts.ACCOUNT_BALANCE;
    private static final String TEMPLATE_HTML = "template.html";
    private HtmlHelper htmlHelper;


    private Toolbar mToolbar;

    private String getHtml() throws IOException {
        String[] keys = {
                "#RECEIPT",
                "#JSONDATA"
        };

        String[] values = {
//                receipt.receiptNo,
//                "{            \"accountName\": \"MD Arif Gazi\",            \"accountNumber\": \"2001158500126\",            \"agentName\": \"BADRUL ALOM\",            \"balanceAmount\": \"BDT 80,550.00\",            \"balanceAmountInWords\": \"EIGHTY THOUSAND FIVE HUNDRED FIFTY ONLY\",            \"boothAddress\": \"VAIRAB BAZAR, CHOWDHURYR HAT, SONAGAZI\",            \"charge\": \"BDT 7.50\",            \"customerAddress\": \"GREEN GADEN BUILDING, FLAT- D4, HOUSE- 12, ROAD- 10, BLOCK- C, MIRPUR, PS- MIRPUR, DHAKA\",            \"customerId\": \"CB1158500\",            \"customerName\": \"Md. Arif Gazi\",            \"depositAmountInWords\": \"THREE THOUSAND ONLY\",            \"depositAmount\": \"BDT 3,000.00\",            \"dpsAccountType\": \"DPS\",            \"linkAccountNumber\": \"2005246987526\",            \"maturityAmount\": \"BDT 2,26,047.00\",            \"maturityDate\": \"19-JAN-2021\",            \"mobileNo\": \"01617877595\",            \"principalAmount\": \"BDT 1,00,000.00\",            \"printDate\": \"19-JAN-2016 13:13:15 PM\",            \"productTenor\": \"5 Years\",            \"profitRate\": \"8.85% (Yearly)\",            \"receiverAccountName\": \"SUJON PATWARY\",            \"termDepositAccountType\": \"TERM DEPOSIT\",            \"transactionDate\": \"19-JAN-2016\",            \"savingsAccountType\": \"Savings\",            \"transactionCode\": \"TR222369\",            \"userId\": \"615001001 (NAIM ISLAM)\",            \"withdrawAmount\": \"BDT 3,000.00 + 7.5 (Charge)\",            \"withdrawsAmountInWords\": \"THREE THOUSAND SEVEN TAKA FIFTY PAISA ONLY\"       }"

                this.getIntent().getStringExtra(RECEIPT_TYPE),
                this.getIntent().getStringExtra(JSON_DATA)
        };
        return htmlHelper.getHtml(TEMPLATE_HTML, keys, values);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        mToolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(mToolbar);
        htmlHelper = new HtmlHelper(this);
        try {
            new WebViewPrint(MainActivity.this)
                    .print(getHtmlFile());
        } catch (IOException e) {
            e.printStackTrace();
        }

        findViewById(R.id.webViewPrintButton).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                try {
                    new WebViewPrint(MainActivity.this)
                            .print(getHtmlFile());
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        });
    }

    private File getHtmlFile() throws IOException {
        return FileHelper.createTempFileInExternalCacheDirectory(this, getHtml());
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case R.id.account_balance:
                receipt = Receipts.ACCOUNT_BALANCE;
                return true;
            case R.id.cash_deposit:
                receipt = Receipts.CASH_DEPOSIT;
                return true;
            case R.id.cash_withdraw:
                receipt = Receipts.CASH_WITHDRAW;
                return true;
            case R.id.dps_account:
                receipt = Receipts.DPS_ACCOUNT;
                return true;
            case R.id.fixed_deposit:
                receipt = Receipts.FIXED_DEPOSIT;
                return true;
            case R.id.fund_transfer:
                receipt = Receipts.FUND_TRANSFER;
                return true;
            case R.id.savings_account:
                receipt = Receipts.SAVINGS_ACCOUNT;
                return true;
            default:
                receipt = Receipts.ACCOUNT_BALANCE;
                return true;
        }
    }
}