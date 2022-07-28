
const createPerformanceCalculator = require("./createPerformanceCalculator")

module.exports = function createStatementData(invoice, plays) {
    const statementData = {};
    statementData.customer = invoice.customer;
    statementData.performances = invoice.performances.map(enrichPerformance);
    statementData.totalAmount = totalAmount(statementData)
    statementData.totalVolumeCredit = totalVolumeCredit(statementData)

    return statementData

    function enrichPerformance(perf){
        const calculator = createPerformanceCalculator(perf, playFor(perf))
        let result = Object.assign({}, perf);
        result.play = calculator.play
        result.amount = calculator.amount
        result.volumeCredit = calculator.volumeCredit
        return result
    }

    function totalAmount(data) {
        return data.performances.reduce((prev, performance)=>
            prev + performance.amount
        , 0)
    }

    function totalVolumeCredit(data){
        return data.performances.reduce((prev, performance)=>prev + performance.volumeCredit, 0);
    }

    function playFor(perf) {
        return plays[perf.playID];
    }
}

