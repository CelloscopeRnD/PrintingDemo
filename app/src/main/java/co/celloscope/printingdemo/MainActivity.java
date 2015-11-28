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

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        htmlHelper = new HtmlHelper(this);


        findViewById(R.id.logoButton).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(Intent.ACTION_PICK);
                intent.setType("image/*");
                startActivityForResult(intent, PICK_LOGO);
            }
        });
        findViewById(R.id.photoButton).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(Intent.ACTION_PICK);
                intent.setType("image/*");
                startActivityForResult(intent, PICK_PHOTO);
            }
        });
        findViewById(R.id.barcodeButton).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(Intent.ACTION_PICK);
                intent.setType("image/*");
                startActivityForResult(intent, PICK_BARCODE);
            }
        });


        pinEditText = (EditText) findViewById(R.id.pinEditText);
        nameEditText = (EditText) findViewById(R.id.nameEditText);


        pin = pinEditText.getText().toString();
        name = nameEditText.getText().toString();
        findViewById(R.id.appPrintButton).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                try {
                    String[] values = {logoFilePath, photoFilePath, barcodeFilePath, pin, name};
                    new SamsungMobilePrint().print(MainActivity.this, htmlHelper.getFinalHtml(TEMPLATE1, keys, values));
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        });

        findViewById(R.id.webViewPrintButton).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                try {
                    String[] values = {logoFilePath, photoFilePath, barcodeFilePath, pin, name};
                    new WebViewPrint().print(MainActivity.this, htmlHelper.getFinalHtml(TEMPLATE1, keys, values));
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        });
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (resultCode == RESULT_OK) {
            ImageView imageView = null;
            switch (requestCode) {
                case PICK_LOGO:
                    imageView = (ImageView) findViewById(R.id.logoImageView);
                    logoFilePath = getRealPathFromUri(this, data.getData());
                    break;
                case PICK_PHOTO:
                    imageView = (ImageView) findViewById(R.id.photoImageView);
                    photoFilePath = getRealPathFromUri(this, data.getData());
                    break;
                case PICK_BARCODE:
                    imageView = (ImageView) findViewById(R.id.barcodeImageView);
                    barcodeFilePath = getRealPathFromUri(this, data.getData());
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