package co.celloscope.printingdemo;

import android.support.annotation.NonNull;

/**
 * Perform string related operations
 */
class StringHelper {
    /**
     * Replace keys with value of the specified text
     *
     * @param text   keys of this will be replaced
     * @param keys   that will be replaced
     * @param values that will replace
     * @return
     */
    static String replaceToken(@NonNull String text, @NonNull String[] keys, @NonNull String[] values) {
        if (keys.length != values.length) {
            throw new IllegalArgumentException("keys and values should be same length");
        }

        for (int i = 0; i < keys.length; i++) {
            text = text.replace(keys[i], values[i]);
        }
        return text;
    }
}
