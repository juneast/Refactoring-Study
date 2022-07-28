
const invoices = require("./invoices.json")
const plays = require("./plays.json")
const createStatementData = require("./createStatementData")

const statement = (invoice, plays) => {
    return renderPlainText(createStatementData(invoice, plays))
} 

function renderPlainText(data){
    let result = `청구 내역 (고객명 : ${data.customer})\n`;

    for(let perf of data.performances){
        result += ` ${perf.play.name} : ${usd(perf.amount)} (${perf.audience}석)\n`
    }

    result += `총액 : ${usd(data.totalAmount)}\n`
    result += `적립 포인트 : ${data.totalVolumeCredit}점\n`
    return result

    function usd(amount){
        return new Intl.NumberFormat("en-US", {
            style : "currency", currency : "USD", minimumFractionDigits:2
        }).format(amount/100);
    }
}
console.log(statement(invoices[0], plays))
