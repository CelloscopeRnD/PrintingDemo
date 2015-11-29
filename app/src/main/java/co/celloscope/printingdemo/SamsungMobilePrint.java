package co.celloscope.printingdemo;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.support.annotation.NonNull;

import java.io.File;

/**
 * Helper class which print using Samsung Mobile Print app.
 * Takes html string; creates a temporary file and
 * send it to Mobile Print app for printing.
 */
class SamsungMobilePrint {
    /**
     * Open Samsung Mobile Print app for printing
     * It creates an intent with necessary extras and
     * start the activity
     * @param context activity context
     */
    @SuppressWarnings("SpellCheckingInspection")
    static void print(@NonNull final Context context, @NonNull final File file) {
        Intent intent = new Intent("com.sec.print.mobileprint.action.PRINT");
        Uri uri = Uri.fromFile(file);
        intent.putExtra("com.sec.print.mobileprint.extra.CONTENT", uri);
        intent.putExtra("com.sec.print.mobileprint.extra.CONTENT_TYPE", "WEBPAGE_AUTO");
        intent.putExtra("com.sec.print.mobileprint.extra.OPTION_TYPE", "DOCUMENT_PRINT");
        intent.putExtra("com.sec.print.mobileprint.extra.JOB_NAME", "TestPrint");
        context.startActivity(intent);
    }
}
