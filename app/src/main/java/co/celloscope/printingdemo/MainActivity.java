package co.celloscope.printingdemo;

import android.content.Context;
import android.content.Intent;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Bundle;
import android.print.PrintAttributes;
import android.print.PrintDocumentAdapter;
import android.print.PrintJob;
import android.print.PrintManager;
import android.provider.MediaStore;
import android.support.design.widget.FloatingActionButton;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.View;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.EditText;
import android.widget.ImageView;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class MainActivity extends AppCompatActivity {

    private static final String TAG = MainActivity.class.getSimpleName();
    private static final int PICK_LOGO = 100;
    public static final int PICK_PHOTO = 200;
    private static final int PICK_BARCODE = 300;
    // Asset that contains html template
    private static final String TEMPLATE1 = "Template1.html";
    private List<PrintJob> mPrintJobs;
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
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
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

        mPrintJobs = new ArrayList<>(10);
        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);

        pin = pinEditText.getText().toString();
        name = nameEditText.getText().toString();
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                try {
//                    doWebViewPrint();

                    String[] values = {logoFilePath, photoFilePath, barcodeFilePath, pin, name};
                    new SamsungMobilePrintApp(MainActivity.this, htmlHelper.getFinalHtml(TEMPLATE1, keys, values)).print();
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






    private WebView mWebView;

    private void doWebViewPrint() throws IOException {
        // Create a WebView object specifically for printing
//        WebView webView = new WebView(getActivity());
        WebView webView = new WebView(this);
        webView.setWebViewClient(new WebViewClient() {

            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                return false;
            }

            @Override
            public void onPageFinished(WebView view, String url) {
                Log.i(TAG, "page finished loading " + url);
                createWebPrintJob(view);
                mWebView = null;
            }
        });

        String[] values = {logoFilePath, photoFilePath, barcodeFilePath, pin, name};
        String htmlDocument = htmlHelper.getFinalHtml(TEMPLATE1, keys, values);
        webView.loadDataWithBaseURL(null, htmlDocument, "text/HTML", "UTF-8", null);

        // Keep a reference to WebView object until you pass the PrintDocumentAdapter
        // to the PrintManager
        mWebView = webView;
    }

    private void createWebPrintJob(WebView webView) {

        // Get a PrintManager instance
        PrintManager printManager = (PrintManager) this.getSystemService(Context.PRINT_SERVICE);

        // Get a print adapter instance
        PrintDocumentAdapter printAdapter = webView.createPrintDocumentAdapter();

        // Create a print job with name and adapter instance
        String jobName = getString(R.string.app_name) + " Document";
        PrintJob printJob = printManager.print(jobName, printAdapter,
                new PrintAttributes.Builder().build());

        // Save the job object for later status checking
        mPrintJobs.add(printJob);
    }
}