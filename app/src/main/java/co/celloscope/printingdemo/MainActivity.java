package co.celloscope.printingdemo;

import android.content.Intent;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageView;

import java.io.File;
import java.io.IOException;

public class MainActivity extends AppCompatActivity {

    private static final String TAG = MainActivity.class.getSimpleName();
    public static final int PICK_PHOTO = 200;
    // Asset that contains html template
    private static final String SAVINGS_ACCOUNT_TEMPLATE = "savings_account.html";
    private HtmlHelper htmlHelper;

    private EditText account_nameEditText;
    private EditText account_noEditText;
    private EditText account_opening_dateEditText;
    private EditText savings_account_typeEditText;
    private EditText districtEditText;
    private EditText id_noEditText;
    private EditText mobile_noEditText;
    private EditText nameEditText;
    private EditText print_dateEditText;
    private EditText sub_districtEditText;
    private EditText villageEditText;
    private EditText unionEditText;

    private static final String style_sheet = "file:///android_asset/styles.css";

    private static final String agent_banking_logo = "file:///android_asset/agent_banking_logo.jpg";
    private static final String logo = "file:///android_asset/logo.gif";
    private String photo = "photo.jpg";
    private String qr = "Undefined";


    private String agent_name;
    private String agent_point;
    private String booth_address;
    private String outlet_name;

    private String account_name;
    private String account_no;
    private String account_opening_date;
    private String cash_deposit = "Undefined";
    private String cash_withdraw = "Undefined";
    private String current_account_type = "Undefined";
    private String district;
    private String deposit_amount = "Undefined";
    private String end_date = "Undefined";
    private String expiry_amount = "Undefined";
    private String expire_date = "Undefined";
    private String id_no;
    private String initial_deposit = "Undefined";
    private String link_account_number = "Undefined";
    private String mobile_no;
    private String monthly_deposit = "Undefined";
    private String name;
    private String print_date;
    private String request_id = "Undefined";
    private String savings_account_type = "Undefined";
    private String timeSpan = "Undefined";
    private String transaction_date = "Undefined";
    private String transaction_id = "Undefined";
    private String village;
    private String union;
    private String user_id;
    private String withdraw_amount = "Undefined";
    private String sub_district;

    private String getHtml() throws IOException {
        String[] keys = {
                "#STYLE_SHEET",

                "#AGENT_BANKING_LOGO",
                "#LOGO",
                "#PHOTO",
                "#QR",

                "#AGENT_NAME",
                "#AGENT_POINT",
                "#BOOTH_ADDRESS",
                "#OUTLATE_NAME",

                "#ACCOUNT_NAME",
                "#ACCOUNT_NO",
                "#ACCOUNT_OPENING_DATE",
                "#CASH_DEPOSIT",
                "#CASH_WITHDRAW",
                "#CURRENT_ACCOUNT_TYPE",
                "#DISTRICT",
                "#DEPOSIT_AMOUNT",
                "#END_DATE",
                "#EXPIRY_AMOUNT",
                "#EXPAIRE_DATE",
                "#ID_NO",
                "#INITIAL_DEPOSIT",
                "#LINK_ACCOUNT_NUMBER",
                "#MOBILE_NO",
                "#MONTHLY_DEPOSIT",
                "#NAME",
                "#PRINT_DATE",
                "#REQUEST_ID",
                "#SAVINGS_ACCOUNT_TYPE",
                "#SUB_DISTRICT",
                "#TIMESPAN",
                "#TRANSACTION_DATE",
                "#TRANSACTION_ID",
                "#VILLAGE",
                "#UNION",
                "#USER_ID",
                "#WITHDRAW_AMOUNT"
        };

        String[] values = {
                style_sheet,

                agent_banking_logo,
                logo,
                photo,
                qr,

                agent_name,
                agent_point,
                booth_address,
                outlet_name,

                account_name,
                account_no,
                account_opening_date,
                cash_deposit,
                cash_withdraw,
                current_account_type,
                district,
                deposit_amount,
                end_date,
                expiry_amount,
                expire_date,
                id_no,
                initial_deposit,
                link_account_number,
                mobile_no,
                monthly_deposit,
                name,
                print_date,
                request_id,
                savings_account_type,
                sub_district,
                timeSpan,
                transaction_date,
                transaction_id,
                village,
                union,
                user_id,
                withdraw_amount};
        return htmlHelper.getHtml(SAVINGS_ACCOUNT_TEMPLATE, keys, values);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        initializeControl();
        setLoginInformation();
        setTestValue();
        htmlHelper = new HtmlHelper(this);

        findViewById(R.id.photoButton).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(Intent.ACTION_PICK);
                intent.setType("image/*");
                startActivityForResult(intent, PICK_PHOTO);
            }
        });

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

    private void setLoginInformation() {
        user_id = "11009(Naim Islam)";
        agent_name = "Raqibul Alom";
        agent_point = "Kashipur Bazar";
        booth_address = "Vairab Chowdhurir Hath, Sonagazi";
        outlet_name = "Vairab Chowdhurir Hath, Sonagazi";
    }

    private void initializeControl() {
        account_nameEditText = (EditText) findViewById(R.id.account_nameEditText);
        account_noEditText = (EditText) findViewById(R.id.account_noEditText);
        account_opening_dateEditText = (EditText) findViewById(R.id.account_opening_dateEditText);
        savings_account_typeEditText = (EditText) findViewById(R.id.account_typeEditText);
        districtEditText = (EditText) findViewById(R.id.districtEditText);
        id_noEditText = (EditText) findViewById(R.id.id_noEditText);
        mobile_noEditText = (EditText) findViewById(R.id.mobile_noEditText);
        nameEditText = (EditText) findViewById(R.id.nameEditText);
        print_dateEditText = (EditText) findViewById(R.id.print_dateEditText);
        sub_districtEditText = (EditText) findViewById(R.id.sub_districtEditText);
        villageEditText = (EditText) findViewById(R.id.villageEditText);
        unionEditText = (EditText) findViewById(R.id.unionEditText);
    }

    private void setTestValue() {
        account_nameEditText.setText("Mohammad Karim");
        account_noEditText.setText("100-5000001-001"); //Account Number will be 13 characters
        account_opening_dateEditText.setText("30-NOV-2015");
        districtEditText.setText("Feni");
        id_noEditText.setText("CB5000001"); //ID will be 7 characters
        mobile_noEditText.setText("01799123456");
        nameEditText.setText("Mohammad Karim");
        print_dateEditText.setText("30-NOV-2015 11:15:15 AM");
        savings_account_typeEditText.setText("Savings Account");
        sub_districtEditText.setText("Sonagazi");
        villageEditText.setText("Sujapur");
        unionEditText.setText("Vhairab Chowdhurir Hat");
    }

    private void setValue() {
        account_name = account_nameEditText.getText().toString();
        account_no = account_noEditText.getText().toString();
        account_opening_date = account_opening_dateEditText.getText().toString();
        savings_account_type = savings_account_typeEditText.getText().toString();
        district = districtEditText.getText().toString();
        id_no = id_noEditText.getText().toString();
        mobile_no = mobile_noEditText.getText().toString();
        name = nameEditText.getText().toString();
        print_date = print_dateEditText.getText().toString();
        sub_district = sub_districtEditText.getText().toString();
        village = villageEditText.getText().toString();
        union = unionEditText.getText().toString();
    }

    private File getHtmlFile() throws IOException {
        return FileHelper.createTempFileInExternalCacheDirectory(this, getHtml());
    }


    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (resultCode == RESULT_OK) {
            ImageView imageView = null;
            switch (requestCode) {
                case PICK_PHOTO:
                    imageView = (ImageView) findViewById(R.id.photoImageView);
                    FileHelper.copyFileToExternalCacheDir(this,
                            new File(FileHelper.getRealPathFromUri(this, data.getData())), photo);
                    break;
            }
            if (imageView != null) {
                final Bitmap photo;
                try {
                    photo = BitmapHelper.getThumbnail(data.getData(), this);
                    imageView.setImageBitmap(photo);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

        super.onActivityResult(requestCode, resultCode, data);
    }
}