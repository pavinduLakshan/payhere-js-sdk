enum TimeUnit {
    WEEK = "Week",
    MONTH = "Month",
    YEAR = "Year"
}

export abstract class RecurringTimeUnit {
    private nUnits: number = 0;
    private timeUnit: string = "";

    constructor(nUnits:number,timeUnit:TimeUnit) {
        if(nUnits <= 0 || !Number.isInteger(nUnits)) {            
            console.error(`${nUnits} ${timeUnit} is not a valid time duration`)
        } else {
            this.nUnits = nUnits;
            this.timeUnit = timeUnit;
        }    
    }

    toString():string{
        if(!this.nUnits || !this.timeUnit) {
            return ""
        }
        return `${this.nUnits} ${this.timeUnit}`
    }
}

export class Week extends RecurringTimeUnit{
    constructor(nWeeks:number){
        super(nWeeks,TimeUnit.WEEK);
    }   
}

export class Month extends RecurringTimeUnit{
    constructor(nMonths:number){
        super(nMonths,TimeUnit.MONTH);
    }   
}

export class Year extends RecurringTimeUnit{
    constructor(nYears:number){
        super(nYears,TimeUnit.YEAR);
    }    
}