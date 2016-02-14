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

    static String getRealPathFromUri(Context context, Uri contentUri) {
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

    static boolean copyFileToExternalCacheDir(Context context, File source, String destinationFileName) {
        try {
            FileInputStream sourceFile = new FileInputStream(source);
            File dest = new File(getDestinationDirectory(context), destinationFileName);

            try {
                java.io.FileOutputStream destinationFile = null;

                try {
                    destinationFile = new FileOutputStream(dest);

                    // Lecture par segment de 0.5Mo
                    byte buffer[] = new byte[512 * 1024];
                    int nbLecture;

                    while ((nbLecture = sourceFile.read(buffer)) != -1) {
                        destinationFile.write(buffer, 0, nbLecture);
                    }
                } finally {
                    destinationFile.close();
                }
            } finally {
                sourceFile.close();
            }
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
//            f.delete();
        }
    }
}
