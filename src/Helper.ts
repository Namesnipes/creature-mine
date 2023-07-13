export abstract class Helper{

    static Lerp(start: number, stop: number, amt: number) {
        if (amt > 1)
            amt = 1;
        else if (amt < 0)
            amt = 0;
        return start + (stop - start) * amt;
    }
}