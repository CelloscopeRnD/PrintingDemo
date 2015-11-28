package co.celloscope.printingdemo;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.support.annotation.NonNull;
import android.widget.Toast;

import java.io.IOException;

/**
 * Helper class which print using Samsung Mobile Print app.
 * Takes html string; creates a temporary file and
 * send it to Mobile Print app for printing.
 */
class SamsungMobilePrint implements Printer {
    public static final String prefix = "temp";
    public static final String suffix = ".html";

    /**
     * Open Samsung Mobile Print app for printing
     * It creates an intent with necessary extras and
     * start the activity
     * @param context activity context
     * @param data html string from which document will be printed
     */
    @SuppressWarnings("SpellCheckingInspection")
    public void print(@NonNull final Context context, @NonNull final String data) {
        try {
            Intent intent = new Intent("com.sec.print.mobileprint.action.PRINT");
            Uri uri = Uri.fromFile(FileHelper.createTempFileInExternalCacheDirectory(context, data, prefix, suffix));
            intent.putExtra("com.sec.print.mobileprint.extra.CONTENT", uri);
            intent.putExtra("com.sec.print.mobileprint.extra.CONTENT_TYPE", "WEBPAGE_AUTO");
            intent.putExtra("com.sec.print.mobileprint.extra.OPTION_TYPE", "DOCUMENT_PRINT");
            intent.putExtra("com.sec.print.mobileprint.extra.JOB_NAME", "TestPrint");
            context.startActivity(intent);
        } catch (IOException e) {
            Toast.makeText(context, "Couldn't Print", Toast.LENGTH_SHORT).show();
            e.printStackTrace();
        }
    }
}
