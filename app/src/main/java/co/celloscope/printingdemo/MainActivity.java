package co.celloscope.printingdemo;

import android.content.Context;
import android.content.Intent;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Toast;

import java.io.File;
import java.io.IOException;

public class MainActivity extends AppCompatActivity {

    private static final String TAG = MainActivity.class.getSimpleName();
    private static final int PICK_LOGO = 100;
    public static final int PICK_PHOTO = 200;
    private static final int PICK_BARCODE = 300;
    // Asset that contains html template
    private static final String TEMPLATE1 = "Template1.html";
    private EditText pinEditText;
    private EditText nameEditText;
    private String photoFilePath = "";
    private String barcodeFilePath = "";
    private String logoFilePath = "";
    private String pin = "";
    private String name = "";
    String[] keys = {"#LOGO", "#PHOTO", "#BARCODE", "#PIN", "#NAME"};

    private HtmlHelper htmlHelper;
    private File htmlFile;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        pinEditText = (EditText) findViewById(R.id.pinEditText);
        nameEditText = (EditText) findViewById(R.id.nameEditText);
        htmlHelper = new HtmlHelper(this);
        FileHelper.copyAssets(this);

        findViewById(R.id.photoButton).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(Intent.ACTION_PICK);
                intent.setType("image/*");
                startActivityForResult(intent, PICK_PHOTO);
            }
        });

        findViewById(R.id.appPrintButton).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                try {
                    SamsungMobilePrint.print(MainActivity.this, getHtmlFile(logoFilePath, photoFilePath, barcodeFilePath));
                } catch (IOException e) {
                    e.printStackTrace();
                    Toast.makeText(MainActivity.this, "File access  error", Toast.LENGTH_SHORT).show();
                }
            }
        });

        findViewById(R.id.webViewPrintButton).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                try {
                    new WebViewPrint().print(MainActivity.this, getHtmlFile("logo.png", photoFilePath, "barcode.png"));
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
        return htmlHelper.getHtml(TEMPLATE1, keys, values);
    }


    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (resultCode == RESULT_OK) {
            ImageView imageView = null;
            switch (requestCode) {
                case PICK_PHOTO:
                    imageView = (ImageView) findViewById(R.id.photoImageView);
                    photoFilePath = getRealPathFromUri(this, data.getData());
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

    public static String getRealPathFromUri(Context context, Uri contentUri) {
        Cursor cursor = null;
        try {
            String[] proj = {MediaStore.Images.Media.DATA};
            cursor = context.getContentResolver().query(contentUri, proj, null, null, null);
            int column_index = cursor.getColumnIndexOrThrow(MediaStore.Images.Media.DATA);
            cursor.moveToFirst();
            return cursor.getString(column_index);
        } finally {
            if (cursor != null) {
                cursor.close();
            }
        }
    }
}