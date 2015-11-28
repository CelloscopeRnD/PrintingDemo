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

    /**
     * @param context Calling context
     * @param data content to be written in the file
     * @param prefix  the prefix to the temp file name
     * @param suffix  the suffix to the temp file name
     * @return the temporary file
     * @throws IOException if an error occurs when writing the file
     */
    static File createTempFileInExternalCacheDirectory(Context context, String data, String prefix, String suffix) throws IOException {

        File tempFile = File.createTempFile(prefix, suffix, context.getExternalCacheDir());
        BufferedWriter bw = new BufferedWriter(new FileWriter(tempFile));
        bw.write(data);
        bw.close();
        return tempFile;
    }
}
