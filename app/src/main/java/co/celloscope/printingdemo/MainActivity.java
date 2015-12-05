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
    private EditText pinEditText;
    private EditText nameEditText;
    private String photo_file_path = "photo.png";
    private String agent_banking_logo_file_path = "file:///android_asset/agent_banking_logo.jpg";
    private String logo_file_path = "file:///android_asset/logo.gif";
    private String pin = "";
    private String name = "";
    String[] keys = {"#LOGO", "#PHOTO", "#BARCODE", "#PIN", "#NAME"};

    private HtmlHelper htmlHelper;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        pinEditText = (EditText) findViewById(R.id.pinEditText);
        nameEditText = (EditText) findViewById(R.id.nameEditText);
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
                    new WebViewPrint(MainActivity.this).print(getHtmlFile(logo_file_path, photo_file_path, agent_banking_logo_file_path));
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        });
    }

    private File getHtmlFile(String logo, String photo, String barcode) throws IOException {
        return FileHelper.createTempFileInExternalCacheDirectory(this, getHtml(logo, photo, barcode));
    }

    private String getHtml(String logo, String photo, String barcode) throws IOException {
        pin = pinEditText.getText().toString();
        name = nameEditText.getText().toString();
        String[] values = {logo, photo, barcode, pin, name};
        return htmlHelper.getHtml(SAVINGS_ACCOUNT_TEMPLATE, keys, values);
    }


    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (resultCode == RESULT_OK) {
            ImageView imageView = null;
            switch (requestCode) {
                case PICK_PHOTO:
                    imageView = (ImageView) findViewById(R.id.photoImageView);
                    FileHelper.copyFileToExternalCacheDir(this, new File(FileHelper.getRealPathFromUri(this, data.getData())), "photo.jpg");
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