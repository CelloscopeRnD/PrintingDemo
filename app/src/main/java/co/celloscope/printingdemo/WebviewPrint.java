package co.celloscope.printingdemo;

import android.content.Context;
import android.net.Uri;
import android.print.PrintAttributes;
import android.print.PrintDocumentAdapter;
import android.print.PrintJob;
import android.print.PrintManager;
import android.support.annotation.NonNull;
import android.util.Log;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by assad on 11/28/2015.
 */
class WebViewPrint {

    private static
    final String TAG = WebViewPrint.class.getSimpleName();
    private static List<PrintJob> mPrintJobs;

    private static WebView mWebView;


    static void print(@NonNull final Context context, @NonNull File file) {
        mPrintJobs = new ArrayList<>(10);
        // Create a WebView object specifically for printing
        mWebView = new WebView(context);
        mWebView.setWebViewClient(new WebViewClient() {

            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                return false;
            }

            @Override
            public void onPageFinished(WebView view, String url) {
                Log.i(TAG, "page finished loading " + url);
                createWebPrintJob(view, context);
                mWebView = null;
            }
        });

        mWebView.loadUrl(String.valueOf(Uri.fromFile(file)));
    }

    static void createWebPrintJob(WebView webView, Context context) {

        // Get a PrintManager instance
        PrintManager printManager = (PrintManager) context.getSystemService(Context.PRINT_SERVICE);

        // Get a print adapter instance
        PrintDocumentAdapter printAdapter = webView.createPrintDocumentAdapter();

        // Create a print job with name and adapter instance
        String jobName = context.getString(R.string.app_name) + " Document";
        PrintJob printJob = printManager.print(jobName, printAdapter,
                new PrintAttributes.Builder().build());

        // Save the job object for later status checking
        mPrintJobs.add(printJob);
    }
}
