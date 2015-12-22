package co.celloscope.printingdemo;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;

import java.io.File;
import java.io.IOException;
import java.util.Date;

public class MainActivity extends AppCompatActivity {

    //    private static final String TAG = MainActivity.class.getSimpleName();
    public static final int PICK_PHOTO = 200;
    // Asset that contains html template
    private static final String TEMPLATE_HTML = "template.html";
    private HtmlHelper htmlHelper;


    private static final String style_sheet = "file:///android_asset/styles.css";

    private static final String agent_banking_logo = "file:///android_asset/agent_banking_logo.png";
    private static final String logo = "file:///android_asset/logo.gif";
    private String photo = "file:///android_asset/photo.png";
    private String qr = "file:///android_asset/qr.png";

    private Toolbar mToolbar;


    private String accountNoText;
    private String accountNameText;
    private String accountBalanceText;
    private String accountOpeningDateText;
    private String accountTypeText;
    private String addressLine1Text;
    private String addressLine2Text;
    private String addressLine3Text;
    private String addressLine4Text;
    private String addressText;
    private String agentNameText;
    private String balanceAmountText;
    private String balanceDateText;
    private String chargeText;
    private String cashDepositText;
    private String cashWithdrawText;
    private String cityAgentFixedDepositText;
    private String cityAgentSavingsAccountText;
    private String colonText;
    private String customerIdText;
    private String customerNameText;
    private String depositAmountText;
    private String depositDateText;
    private String emptyText = "";
    private String fundTransferDateText;
    private String fundTrasferText;
    private String generalDPSAccountText;
    private String initialDepositText;
    private String inWordsText;
    private String linkAccountNumberText;
    private String maturityAmountText;
    private String maturityDateText;
    private String mobileNoText;
    private String monthlyDepositText;
    private String profitRateText;
    private String printDateText;
    private String principalAmountText;
    private String productTenorText;
    private String receiverAccountNoText;
    private String receiverAccountNameText;
    private String senderAccountNoText;
    private String sendrAccountNameText;
    private String transferAmountText;
    private String transactionIdText;
    private String userText;
    private String withdrawAmountText;
    private String withdrawDateText;

    private String accountNameValue = "MD Arif Gazi";
    private String accountNumberValue = "2001158500126";
    private String balanceAmountValue = "BDT 80,550.00";
    private String balanceAmountInWordsValue = "EIGHTY THOUSAND FIVE HUNDRED FIFTY ONLY";
    private String chargeVaue = "BDT 7.50";
    private Date today = new Date();
    private String currentDate = today.toString();
    private String customerAddressValue = "GREEN GADEN BUILDING, FLAT- D4, HOUSE- 12, ROAD- 10, BLOCK- C, MIRPUR, PS- MIRPUR, DHAKA";
    private String depositAmountInWordsValue = "THREE THOUSAND ONLY";
    private String depositAmountValue = "BDT 3,000.00";
    private String dpsAccountTypeValue = "DPS";
    private String linkAccountNumberValue = "2005246987526";
    private String maturityAmountValue = "BDT 2,26,047.00";
    private String maturityDate = (new Date()).toString();
    private String principalAmountValue = "BDT 1,00,000.00";
    private String printDateValue = (new Date()).toString();
    private String productTenorValue = "5 Years";
    private String profitRateValue = "8.85% (Yearly)";
    private String receiverAccountNameValue = "SUJON PATWARY";
    private String termDepositAccountTypeValue = "TERM DEPOSIT";
    private String savingsAccountTypeValue = "Savings";
    private String transactionCodeValue = "TR222369";
    private String withdrawAmountValue = "BDT 3,000.00 + 7.5 (Charge)";
    private String withdrawsAmountInWordsValue = "THREE THOUSAND SEVEN TAKA FIFTY PAISA ONLY";

    private String getHtml() throws IOException {
        String[] keys = {
                "#STYLE_SHEET",

                "#AGENT_BANKING_LOGO",
                "#LOGO",
                "#PHOTO",
                "#QR",

                "#ADDRESS_LINE_1",
                "#ADDRESS_LINE_2",
                "#ADDRESS_LINE_3",
                "#ADDRESS_LINE_4",
                "#AGENT_NAME_LABEL",
                "#AGENT_NAME",
                "#USER_ID_LABEL",
                "#USER_ID",
                "#ADDRESS_LABEL",
                "#BOOTH_ADDRESS",
                "#CUSTOMER_ID_LABEL",
                "#CUSTOMER_ID",
                "#ACCOUNT_TYPE_LABEL",
                "#CUSTOMER_NAME_LABEL",
                "#CUSTOMER_NAME",
                "#MOBILE_NO_LABEL",
                "#MOBILE_NO"
        };

        String[] values = {
                style_sheet,

                agent_banking_logo,
                logo,
                photo,
                qr,

                addressLine1Text,
                addressLine2Text,
                addressLine3Text,
                addressLine4Text,
                agentNameText,
                "BADRUL ALOM",
                userText,
                "615001001 (NAIM ISLAM)",
                addressText,
                "VAIRAB BAZAR, CHOWDHURYR HAT, SONAGAZI",
                customerIdText,
                "CB1158500",
                accountTypeText,
                customerNameText,
                "MD Arif Gazi",
                mobileNoText,
                "01617877595"
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
                    setValue();
                    new WebViewPrint(MainActivity.this)
                            .print(getHtmlFile());
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        });
    }


    private void setValue() {
        accountNoText = this.getResources().getString(R.string.accountNoText);
        accountNameText = this.getResources().getString(R.string.accountNameText);
        accountBalanceText = this.getResources().getString(R.string.accountBalanceText);
        accountOpeningDateText = this.getResources().getString(R.string.accountOpeningDateText);
        accountTypeText = this.getResources().getString(R.string.accountTypeText);
        addressLine1Text = this.getResources().getString(R.string.addressLine1Text);
        addressLine2Text = this.getResources().getString(R.string.addressLine2Text);
        addressLine3Text = this.getResources().getString(R.string.addressLine3Text);
        addressLine4Text = this.getResources().getString(R.string.addressLine4Text);
        addressText = this.getResources().getString(R.string.addressText);
        agentNameText = this.getResources().getString(R.string.agentNameText);
        balanceAmountText = this.getResources().getString(R.string.balanceAmountText);
        balanceDateText = this.getResources().getString(R.string.balanceDateText);
        chargeText = this.getResources().getString(R.string.chargeText);
        cashDepositText = this.getResources().getString(R.string.cashDepositText);
        cashWithdrawText = this.getResources().getString(R.string.cashWithdrawText);
        cityAgentFixedDepositText = this.getResources().getString(R.string.cityAgentFixedDepositText);
        cityAgentSavingsAccountText = this.getResources().getString(R.string.cityAgentSavingsAccountText);
        colonText = this.getResources().getString(R.string.colonText);
        customerIdText = this.getResources().getString(R.string.customerIdText);
        customerNameText = this.getResources().getString(R.string.customerNameText);
        depositAmountText = this.getResources().getString(R.string.depositAmountText);
        depositDateText = this.getResources().getString(R.string.depositDateText);
        emptyText = "";
        fundTransferDateText = this.getResources().getString(R.string.fundTransferDateText);
        fundTrasferText = this.getResources().getString(R.string.fundTrasferText);
        generalDPSAccountText = this.getResources().getString(R.string.generalDPSAccountText);
        initialDepositText = this.getResources().getString(R.string.initialDepositText);
        inWordsText = this.getResources().getString(R.string.inWordsText);
        linkAccountNumberText = this.getResources().getString(R.string.linkAccountNumberText);
        maturityAmountText = this.getResources().getString(R.string.maturityAmountText);
        maturityDateText = this.getResources().getString(R.string.maturityDateText);
        mobileNoText = this.getResources().getString(R.string.mobileNoText);
        monthlyDepositText = this.getResources().getString(R.string.monthlyDepositText);
        profitRateText = this.getResources().getString(R.string.profitRateText);
        printDateText = this.getResources().getString(R.string.printDateText);
        principalAmountText = this.getResources().getString(R.string.principalAmountText);
        productTenorText = this.getResources().getString(R.string.productTenorText);
        receiverAccountNoText = this.getResources().getString(R.string.receiverAccountNoText);
        receiverAccountNameText = this.getResources().getString(R.string.receiverAccountNameText);
        senderAccountNoText = this.getResources().getString(R.string.senderAccountNoText);
        sendrAccountNameText = this.getResources().getString(R.string.sendrAccountNameText);
        transferAmountText = this.getResources().getString(R.string.transferAmountText);
        transactionIdText = this.getResources().getString(R.string.transactionIdText);
        userText = this.getResources().getString(R.string.userText);
        withdrawAmountText = this.getResources().getString(R.string.withdrawAmountText);
        withdrawDateText = this.getResources().getString(R.string.withdrawDateText);

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