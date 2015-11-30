package co.celloscope.printingdemo;

import android.content.Context;
import android.content.res.AssetManager;
import android.database.Cursor;
import android.net.Uri;
import android.provider.MediaStore;
import android.util.Log;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

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

        File tempFile = File.createTempFile(prefix, suffix, context.getExternalCacheDir());
        BufferedWriter bw = new BufferedWriter(new FileWriter(tempFile));
        bw.write(data);
        bw.close();
        return tempFile;
    }

    static void copyAssets(Context context) {
        AssetManager assetManager = context.getAssets();
        String[] files = null;
        try {
            files = assetManager.list("");
        } catch (IOException e) {
            Log.e("tag", "Failed to get asset file list.", e);
        }
        if (files != null) for (String filename : files) {
            InputStream in = null;
            OutputStream out = null;
            try {
                in = assetManager.open(filename);
                File outFile = new File(context.getExternalCacheDir(), filename);
                out = new FileOutputStream(outFile);
                copyFile(in, out);
            } catch (IOException e) {
                Log.e("tag", "Failed to copy asset file: " + filename, e);
            } finally {
                if (in != null) {
                    try {
                        in.close();
                    } catch (IOException e) {
                        // NOOP
                    }
                }
                if (out != null) {
                    try {
                        out.close();
                    } catch (IOException e) {
                        // NOOP
                    }
                }
            }
        }
    }

    private static void copyFile(InputStream in, OutputStream out) throws IOException {
        byte[] buffer = new byte[1024];
        int read;
        while ((read = in.read(buffer)) != -1) {
            out.write(buffer, 0, read);
        }
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
            File dest = new File(context.getExternalCacheDir(), destinationFileName);

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
}
