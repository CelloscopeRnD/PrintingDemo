package co.celloscope.printingdemo;

import android.content.Context;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

/**
 * Manage file related operations
 */
public class FileHelper {
    private static final String prefix = "temp"; //prefix to the temp file name
    private static final String suffix = ".html"; //suffix to the temp file name

    /**
     * @param context Calling context
     * @param data content to be written in the file
     * @return the temporary file
     * @throws IOException if an error occurs when writing the file
     */
    static File createTempFileInExternalCacheDirectory(Context context, String data)
            throws IOException {

        File tempFile = File.createTempFile(prefix, suffix, context.getExternalCacheDir());
        BufferedWriter bw = new BufferedWriter(new FileWriter(tempFile));
        bw.write(data);
        bw.close();
        return tempFile;
    }
}
