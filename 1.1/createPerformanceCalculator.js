module.exports = function createPerformanceCalculator (aPerformance, play) {
    switch(play.type) {
        case "tragedy" : return new TragedyCalculator(aPerformance, play)
        case "comedy" : return new ComedyCalculator(aPerformance, play)
        default:
            throw new Error(`알 수 없는 장르 : ${this.play.type}`)
    }
} 



class PerformanceCalculator {
    constructor(aPerformance, aPlay) {
        this.performance = aPerformance;
        this.play = aPlay;
    }

    get amount(){
        
    }

    get volumeCredit(){
        return Math.max(this.performance.audience - 30, 0);
    }
}

class TragedyCalculator extends PerformanceCalculator {
    get amount(){
        let result = 40000;
        if(this.performance.audience > 30) {``
            result += 1000 * (this.performance.audience - 30);
        }
        return result
    }
}
class ComedyCalculator extends PerformanceCalculator {
    get amount(){
        let result = 30000;
        if(this.performance.audience > 20) {
            result += 10000 + 500 * (this.performance.audience-20);
        }
        result += 300 * this.performance.audience;
        return result
    }

    get volumeCredit() {
        return super.volumeCredit + Math.floor(this.performance.audience / 5);
    }
}