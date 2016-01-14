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

    private static final String TEMPLATE_HTML = "template.html";
    private HtmlHelper htmlHelper;
    private Toolbar mToolbar;
    private String getHtml() throws IOException {
        String[] keys = {
                "#RECEIPT"
        };

        String[] values = {
                "1"
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
            case R.id.savings_account:
                return true;
            case R.id.current_account:
                return true;
            case R.id.dps_account:
                return true;
            case R.id.cash_deposit:
                return true;
            case R.id.cash_withdraw:
                return true;
            case R.id.fund_transfer:
                return true;
            case R.id.reb:
                return true;
            case R.id.agent_banking:
                return true;
            case R.id.remittance:
                return true;
            case R.id.term_deposit:
                return true;
            default:
                return super.onOptionsItemSelected(item);
        }
    }


}