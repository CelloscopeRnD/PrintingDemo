package co.celloscope.printingdemo;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;

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

    private Receipts receipt = Receipts.ACCOUNT_BALANCE;
    private static final String TEMPLATE_HTML = "template.html";
    private HtmlHelper htmlHelper;


    private Toolbar mToolbar;

    private String getHtml() throws IOException {
        String[] keys = {
                "#RECEIPT"
        };

        String[] values = {
                receipt.receiptNo
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