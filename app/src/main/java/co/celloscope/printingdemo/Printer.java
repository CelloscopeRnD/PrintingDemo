package co.celloscope.printingdemo;

import android.content.Context;
import android.support.annotation.NonNull;

/**
 *Print document
 */
interface Printer {
    void print(@NonNull final Context context, @NonNull final String data);
}
