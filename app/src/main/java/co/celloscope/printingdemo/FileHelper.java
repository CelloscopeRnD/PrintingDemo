package co.celloscope.printingdemo;

import android.content.Context;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.net.Uri;
import android.provider.MediaStore;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
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
     * @param data    content to be written in the file
     * @return the temporary file
     * @throws IOException if an error occurs when writing the file
     */
    static File createTempFileInExternalCacheDirectory(Context context, String data)
            throws IOException {

        File tempFile = File.createTempFile(prefix, suffix, getDestinationDirectory(context));
        BufferedWriter bw = new BufferedWriter(new FileWriter(tempFile));
        bw.write(data);
        bw.close();
        return tempFile;
    }

    static boolean createPhotoInExternalCacheDirectory(Context context, Bitmap bitmap, String destinationFileName) {
        try {
            File dest = new File(getDestinationDirectory(context), destinationFileName);
            java.io.FileOutputStream destinationFile = new FileOutputStream(dest);
            bitmap.compress(Bitmap.CompressFormat.PNG, 85, destinationFile);
            destinationFile.flush();
            destinationFile.close();
        } catch (IOException e) {
            e.printStackTrace();
            return false; // Erreur
        }

        return true; // Rsultat OK
    }

    static File getDestinationDirectory(Context context) {
        return context.getExternalCacheDir();
    }

    static void deleteDestinationDirectory(Context context) {
        for (File f :
                getDestinationDirectory(context).listFiles()) {
            f.delete();
        }
    }
}
