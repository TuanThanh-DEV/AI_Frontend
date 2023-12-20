import React from 'react';

// Show this when screen with long loading time
const LoadingScreen = (props) => {
    return (<div className="text-center" style={{verticalAlign: 'middle'}}>
        <br/>
        <img src="/assets/images/squares.gif" alt="verify"/>
    </div>);
}
let getClassOfStatus = (invoiceStatus) => {
    switch (invoiceStatus) {
        case "INIT":
            return "label-info";
        case "NEW":
            return "label-info";
        case "PAID":
            return "label-success";
        case "CANCEL":
            return "label-default";
        case "REFUND":
            return "label-warn";
        case "SUSPEND":
            return "label-info";
        case "TRIAL":
            return "label-info";
        default:
            return "";
    }
};
const SpanInvoiceStatus = (props) => {
    const {status, t} = props;
    return (<span className={["label", getClassOfStatus(status)].join(" ")}>{t("label_invoiceStatus_" + status)}</span>);
};

export {LoadingScreen, SpanInvoiceStatus};