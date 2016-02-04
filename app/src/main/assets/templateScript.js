window.onload = function () {
    var url = window.location.search;
    url = url.replace("?", ''); // remove the ?
    if (!url) {
        url = receipt;
        window.data = JSON.parse(window.stringData);
    } else {
        window.data = {
            "accountName": "MD Arif Gazi", "accountNumber": "2001158500126", "agentName": "BADRUL ALOM", "balanceAmount": "BDT 80,550.00",
            "balanceAmountInWords": "EIGHTY THOUSAND FIVE HUNDRED FIFTY ONLY", "boothAddress": "VAIRAB BAZAR, CHOWDHURYR HAT, SONAGAZI",
            "charge": "BDT 7.50", "customerAddress": "GREEN GADEN BUILDING, FLAT- D4, HOUSE- 12, ROAD- 10, BLOCK- C, MIRPUR, PS- MIRPUR, DHAKA",
            "customerId": "CB1158500", "customerName": "Md. Arif Gazi", "depositAmountInWords": "THREE THOUSAND ONLY",
            "depositAmount": "BDT 3,000.00", "dpsAccountType": "DPS", "linkAccountNumber": "2005246987526",
            "maturityAmount": "BDT 2,26,047.00", "maturityDate": "19-JAN-2021", "mobileNo": "01617877595",
            "principalAmount": "BDT 1,00,000.00", "printDate": "19-JAN-2016 13:13:15 PM", "productTenor": "5 Years",
            "profitRate": "8.85% (Yearly)", "receiverAccountName": "SUJON PATWARY", "termDepositAccountType": "TERM DEPOSIT",
            "transactionDate": "19-JAN-2016", "savingsAccountType": "Savings", "transactionCode": "TR222369",
            "userId": "615001001 (NAIM ISLAM)", "withdrawAmount": "BDT 3,000.00 + 7.5 (Charge)",
            "withdrawsAmountInWords": "THREE THOUSAND SEVEN TAKA FIFTY PAISA ONLY", "cardType": "ATM", "cardBrand": "VISA",
            "cardNumber": "1234 1234 1234 1234", "noOfLeave": "10", "chequeLeafNumber": "123 456 789 123", "chequeAmount": "BDT 10,000.00",
            "receiverName": "Asadul Haque", "chequeLostReason": "Lost", "retrieveFrom": "From Lost"
        };
        window.data = { "accountName": "MD Arif Gazi", "accountNumber": "2001158500126", "agentName": "BADRUL ALOM", "balanceAmount": "BDT 80,550.00", "balanceAmountInWords": "EIGHTY THOUSAND FIVE HUNDRED FIFTY ONLY", "boothAddress": "VAIRAB BAZAR, CHOWDHURYR HAT, SONAGAZI", "charge": "BDT 7.50", "customerAddress": "GREEN GADEN BUILDING, FLAT- D4, HOUSE- 12, ROAD- 10, BLOCK- C, MIRPUR, PS- MIRPUR, DHAKA", "customerId": "CB1158500", "customerName": "Md. Arif Gazi", "depositAmountInWords": "THREE THOUSAND ONLY", "depositAmount": "BDT 3,000.00", "dpsAccountType": "DPS", "linkAccountNumber": "2005246987526", "maturityAmount": "BDT 2,26,047.00", "maturityDate": "19-JAN-2021", "mobileNo": "01617877595", "principalAmount": "BDT 1,00,000.00", "printDate": "19-JAN-2016 13:13:15 PM", "productTenor": "5 Years", "profitRate": "8.85% (Yearly)", "receiverAccountName": "SUJON PATWARY", "termDepositAccountType": "TERM DEPOSIT", "transactionDate": "19-JAN-2016", "savingsAccountType": "Savings", "transactionCode": "TR222369", "userId": "615001001 (NAIM ISLAM)", "withdrawAmount": "BDT 3,000.00 + 7.5 (Charge)", "withdrawsAmountInWords": "THREE THOUSAND SEVEN TAKA FIFTY PAISA ONLY", "cardType": "ATM", "cardBrand": "VISA", "cardNumber": "1234 1234 1234 1234", "noOfLeave": "10", "chequeLeafNumber": "123 456 789 123", "chequeAmount": "BDT 10,000.00", "receiverName": "Asadul Haque", "chequeLostReason": "Lost", "retrieveFrom": "From Lost" };
    }
    //console.log(window);


    addStyleSheet('style_sheet/styles.css');
    addStyleSheet('file:///android_asset/styles.css');
    replaceToken(parseInt(url));
}

var accountNoLabelId = "accountNoLabel";
var accountNumberId = "accountNumber";
var accountTypeId = "accountType";
var customerAddressId = "customerAddress";
var linkAccountNumberColonId = "linkAccountNumberColon";
var linkAccountNumberLabelId = "linkAccountNumberLabel";
var linkAccountNumberId = "linkAccountNumber";
var titleId = "title";

var accountNoText = "হিসাব নম্বর";
var accountNameText = "হিসাব নাম";
var accountBalanceText = "ব্যালান্স";
var accountOpeningDateText = "হিসাব খোলার তারিখ";
var accountTypeText = "হিসাবের ধরন";
var addressLine1Text = "এজেন্ট ব্যাংকিং ডিভিশন";
var addressLine2Text = "সিটি ব্যাংক লিঃ";
var addressLine3Text = "সিটি ব্যাংক  সেন্টার ১৩৬";
var addressLine4Text = "গুলশান এভিনিউ, ঢাকা-১২১২";
var addressText = "ঠিকানা";
var agentNameText = "এজেন্টের নাম";
var atmDebitCardCancelText = "এটিএম / ডেবিট কার্ড বাতিলকরন";
var atmDebitCardDeliveryText = "এটিএম / ডেবিট কার্ড হস্তান্তর";
var atmDebitCardRequestText = "এটিএম / ডেবিটি কার্ডের অনুরোধ";
var balanceAmountText = "ব্যালান্সের পরিমান";
var balanceDateText = "ব্যালান্সের তারিখ";
var chargeText = "চার্জ";
var cashDepositText = "নগদ জমা";
var cashWithdrawText = "নগদ উত্তোলন";
var chequeBookDeliveryText = "চেক বই হস্তান্তর";
var chequeBookRequisitionText = "চেক বই প্রদানের অনুরোধ";
var chequeStopPaymentSingleCancelText = "চেক স্টপ পেমেন্ট - সিঙ্গেল নির্দেশনা বাতিলকরন";
var chequeStopPaymentRangeCancelText = "চেক স্টপ পেমেন্ট - রেঞ্জ নির্দেশনা বাতিলকরন";
var chequeStopPaymentRangeText = "চেক স্টপ পেমেন্ট নির্দেশনা - রেঞ্জ";
var chequeStopPaymentSingleText = "চেক স্টপ পেমেন্ট নির্দেশনা - সিঙ্গেল";
var cityAgentFixedDepositText = "সিটি এজেন্ট ফিক্সড ডিপোজিট";
var cityAgentSavingsAccountText = "সিটি এজেন্ট সেভিংস হিসাব";
var colonText = ":";
var customerIdText = "গ্রাহক আইডি";
var customerNameText = "গ্রাহকের নাম";
var depositAmountText = "জমার পরিমান";
var depositDateText = "জমার তারিখ";
var emptyText = "";
var fundTransferDateText = "ফান্ড ট্রান্সফারের তারিখ"
var fundTransferText = "ফান্ড ট্রান্সফার";
var generalDPSAccountText = "সাধারন ডিপিএস হিসাব";
var initialDepositText = "প্রারম্ভিক জমার পরিমান";
var inWordsText = "কথায়";
var linkAccountNumberText = "লিংক হিসাব নম্বর";
var maturityAmountText = "মেয়াদান্তে টাকার পরিমান";
var maturityDateText = "মেয়াদান্তের তারিখ";
var mobileNoText = "মোবাইল নং";
var monthlyDepositText = "মাসিক জমা";
var profitRateText = "মুনাফার হার";
var printDateText = "প্রিন্টের তারিখ";
var principalAmountText = "আসল টাকার পরিমান";
var productTenorText = "মেয়াদ";
var receiverAccountNoText = "প্রাপকের হিসাব নম্বর";
var receiverAccountNameText = "প্রাপকের হিসাব নাম";
var senderAccountNoText = "প্রেরকের হিসাব নম্বর";
var sendrAccountNameText = "প্রেরকের হিসাব নাম";
var transferAmountText = "ট্রান্সফারের পরিমান";
var transactionIdText = "লেনদেন আইডি";
var userText = "ইউজার";
var withdrawAmountText = "উত্তোলনের পরিমান";
var withdrawDateText = "উত্তোলনের তারিখ";

var cardTypeText = "কার্ডের ধরণ";
var requestReceiveTimeText = "অনুরোধ গ্রহনের সময়";
var requestIdText = "অনুরোধ আইডি";
var cardTitleText = "কার্ড টাইটেল";
var cardBrandText = "কার্ডের ব্রান্ড";
var cardNumberText = "কার্ড নম্বর";
var deliveryDateText = "হস্তান্তরের তারিখ";
var noOfLeaveText = "পাতার সংখ্যা";
var chequeLostReasonText = "চেকটি";
var chequeLeafNumberText = "চেক পাতার নম্বর";
var amountOfTkText = "টাকার পরিমান";
var receiverNameText = "প্রাপকের নাম";
var retrieveFromText = "পুনরুদ্ধার হয়েছে";

function replaceToken(receipt) {
    addImage("agent_banking_logo", "file:///android_asset/AGENT-BANKING-LOGO_Small.png", "images/AGENT-BANKING-LOGO_Small.png");
    addImage("logo", "file:///android_asset/logo.gif", "images/logo.png");
    addImage("qr", "file:///android_asset/qr.png", "images/qr.png");
    addImage("customerPhoto", "file:///android_asset/photo.png", "images/photo.png");

    addClassText("addressLine1Label", addressLine1Text);
    addClassText("addressLine2Label", addressLine2Text);
    addClassText("addressLine3Label", addressLine3Text);
    addClassText("addressLine4Label", addressLine4Text);

    addClassText("agentNameLabel", agentNameText);
    addClassText("agentName", data.agentName);
    addClassText("userIdLabel", userText);
    addClassText("userId", data.userId);
    addClassText("addressLabel", addressText);
    addClassText("boothAddress", data.boothAddress);
    addClassText("customerIdLabel", customerIdText);
    addClassText("customerId", data.customerId);
    addClassText("accountTypeLabel", accountTypeText);
    addClassText("customerNameLabel", customerNameText);
    addClassText("customerName", data.customerName);
    addClassText("mobileNoLabel", mobileNoText);
    addClassText("mobileNo", data.mobileNo);


    switch (receipt) {
        case 1:
            setAccountBalance();
            break;
        case 2:
            setCashDeposit();
            break;
        case 3:
            setCashWithdraw();
            break;
        case 4:
            setDPSAccount();
            break;
        case 5:
            setFixedDeposit();
            break;
        case 6:
            setFundTransfer();
            break;
        case 7:
            setSavingsAccount();
            break;
        case 8:
            setATMDebitCardRequest();
            break;
        case 9:
            setATMDebitCardDelivery();
            break;
        case 10:
            setATMDebitCardCancel();
            break;
        case 11:
            setChequeBookRequisition();
            break;
        case 12:
            setChequeBookDelivery();
            break;
        case 13:
            setChequeStopPaymentSingle();
            break;
        case 14:
            setChequeStopPaymentRange();
            break;
        case 15:
            setChequeStopPaymentSingleCancel();
            break;
        case 16:
            setChequeStopPaymentRangeCancel();
            break;
        default:
            break;
    }
}
function setAccountBalance() {
    addClassText(titleId, accountBalanceText);

    addClassText(accountNoLabelId, accountNoText);
    addClassText(accountNumberId, data.accountNumber);
    addClassText(accountTypeId, data.savingsAccountType);
    addClassText(linkAccountNumberColonId, emptyText);
    addClassText(linkAccountNumberLabelId, emptyText);
    addClassText(linkAccountNumberId, emptyText);

    addClassText(customerAddressId, data.customerAddress);

    var tableData = [
        [[accountNameText, data.accountName], [balanceDateText, data.transactionDate]],
        [[balanceAmountText, data.balanceAmount], [transactionIdText, data.transactionCode]],
        [[inWordsText, data.balanceAmountInWords], [printDateText, data.printDate]],
        [[emptyText, emptyText], [emptyText, emptyText]],
        [[emptyText, emptyText], [emptyText, emptyText]]
    ];
    replaceTableData(tableData);
}
function setCashDeposit() {
    addClassText("title", cashDepositText);

    addClassText(accountNoLabelId, accountNoText);
    addClassText(accountNumberId, data.accountNumber);
    addClassText(accountTypeId, data.savingsAccountType);
    addClassText(linkAccountNumberColonId, emptyText);
    addClassText(linkAccountNumberLabelId, emptyText);
    addClassText(linkAccountNumberId, emptyText);

    addClassText(customerAddressId, data.customerAddress);

    var tableData = [
       [[accountNameText, data.accountName], [depositDateText, data.transactionDate]],
       [[depositAmountText, data.depositAmount], [transactionIdText, data.transactionCode]],
       [[inWordsText, data.depositAmountInWords], [printDateText, data.printDate]],
       [[emptyText, emptyText], [emptyText, emptyText]],
       [[emptyText, emptyText], [emptyText, emptyText]]
    ];
    replaceTableData(tableData);
}
function setCashWithdraw() {
    addClassText("title", cashWithdrawText);

    addClassText(accountNoLabelId, accountNoText);
    addClassText(accountNumberId, data.accountNumber);
    addClassText(accountTypeId, data.savingsAccountType);
    addClassText(linkAccountNumberColonId, emptyText);
    addClassText(linkAccountNumberLabelId, emptyText);
    addClassText(linkAccountNumberId, emptyText);

    addClassText(customerAddressId, data.customerAddress);

    var tableData = [
       [[accountNameText, data.accountName], [withdrawDateText, data.transactionDate]],
       [[withdrawAmountText, data.withdrawAmount], [transactionIdText, data.transactionCode]],
       [[inWordsText, data.withdrawsAmountInWords], [printDateText, data.printDate]],
       [[emptyText, emptyText], [emptyText, emptyText]],
       [[emptyText, emptyText], [emptyText, emptyText]]
    ];
    replaceTableData(tableData);
}
function setDPSAccount() {
    addClassText("title", generalDPSAccountText);

    addClassText(accountNoLabelId, accountNoText);
    addClassText(accountNumberId, emptyText);
    addClassText(accountTypeId, data.dpsAccountType);
    addClassText(linkAccountNumberLabelId, linkAccountNumberText);
    addClassText(linkAccountNumberColonId, colonText);
    addClassText(linkAccountNumberId, data.linkAccountNumber);

    addClassText(customerAddressId, data.customerAddress);

    var tableData = [
       [[accountNameText, data.accountName], [productTenorText, data.productTenor]],
       [[accountOpeningDateText, data.transactionDate], [maturityDateText, data.maturityDate]],
       [[monthlyDepositText, data.depositAmount], [printDateText, data.printDate]],
       [[maturityAmountText, data.maturityAmount], [emptyText, emptyText]],
       [[emptyText, emptyText], [emptyText, emptyText]]
    ];
    replaceTableData(tableData);
}
function setFixedDeposit() {
    addClassText("title", cityAgentFixedDepositText);

    addClassText(accountNoLabelId, accountNoText);
    addClassText(accountNumberId, emptyText);
    addClassText(accountTypeId, data.termDepositAccountType);
    addClassText(linkAccountNumberLabelId, linkAccountNumberText);
    addClassText(linkAccountNumberColonId, colonText);
    addClassText(linkAccountNumberId, data.linkAccountNumber);

    addClassText(customerAddressId, data.customerAddress);

    var tableData = [
       [[accountNameText, data.accountName], [productTenorText, data.productTenor]],
       [[accountOpeningDateText, data.transactionDate], [maturityDateText, data.maturityDate]],
       [[profitRateText, data.profitRate], [maturityAmountText, data.maturityAmount]],
       [[principalAmountText, data.principalAmount], [printDateText, data.printDate]],
       [[emptyText, emptyText], [emptyText, emptyText]]
    ];
    replaceTableData(tableData);
}
function setFundTransfer() {
    addClassText("title", fundTransferText);

    addClassText(accountNoLabelId, senderAccountNoText);
    addClassText(accountNumberId, data.accountNumber);
    addClassText(accountNumberId, data.accountNumber);
    addClassText(accountTypeId, data.savingsAccountType);
    addClassText(linkAccountNumberLabelId, emptyText);
    addClassText(linkAccountNumberColonId, emptyText);
    addClassText(linkAccountNumberId, emptyText);

    addClassText(customerAddressId, data.customerAddress);

    var tableData = [
       [[sendrAccountNameText, data.accountName], [fundTransferDateText, data.transactionDate]],
       [[receiverAccountNameText, data.receiverAccountName], [receiverAccountNoText, data.linkAccountNumber]],
       [[transferAmountText, data.depositAmount], [transactionIdText, data.transactionCode]],
       [[inWordsText, data.depositAmountInWords], [printDateText, data.printDate]],
       [[emptyText, emptyText], [emptyText, emptyText]]
    ];
    replaceTableData(tableData);
}
function setSavingsAccount() {
    addClassText("title", cityAgentSavingsAccountText);

    addClassText(accountNoLabelId, accountNoText);
    addClassText(accountNumberId, data.accountNumber);
    addClassText(accountTypeId, data.savingsAccountType);
    addClassText(linkAccountNumberColonId, emptyText);
    addClassText(linkAccountNumberLabelId, emptyText);
    addClassText(linkAccountNumberId, emptyText);

    addClassText(customerAddressId, data.customerAddress);

    var tableData = [
       [[accountNameText, data.accountName], [initialDepositText, data.depositAmount]],
       [[accountOpeningDateText, data.transactionDate], [printDateText, data.printDate]],
       [[emptyText, emptyText], [emptyText, emptyText]],
       [[emptyText, emptyText], [emptyText, emptyText]],
       [[emptyText, emptyText], [emptyText, emptyText]]
    ];
    replaceTableData(tableData);
}

function setATMDebitCardRequest() {
    addClassText("title", atmDebitCardRequestText);

    addClassText(accountNoLabelId, accountNoText);
    addClassText(accountNumberId, data.accountNumber);
    addClassText(accountTypeId, data.savingsAccountType);
    addClassText(linkAccountNumberColonId, emptyText);
    addClassText(linkAccountNumberLabelId, emptyText);
    addClassText(linkAccountNumberId, emptyText);

    addClassText(customerAddressId, data.customerAddress);

    var tableData = [
       [[accountNameText, data.accountName], [requestReceiveTimeText, data.transactionDate]],
       [[cardTypeText, data.cardType], [requestIdText, data.transactionCode]],
       [[cardBrandText, data.cardBrand], [printDateText, data.printDate]],
       [[cardTitleText, data.accountName], [chargeText, data.charge]],
       [[emptyText, emptyText], [emptyText, emptyText]]
    ];
    replaceTableData(tableData);
}
function setATMDebitCardDelivery() {
    addClassText("title", atmDebitCardDeliveryText);

    addClassText(accountNoLabelId, accountNoText);
    addClassText(accountNumberId, data.accountNumber);
    addClassText(accountTypeId, data.savingsAccountType);
    addClassText(linkAccountNumberColonId, emptyText);
    addClassText(linkAccountNumberLabelId, emptyText);
    addClassText(linkAccountNumberId, emptyText);

    addClassText(customerAddressId, data.customerAddress);

    var tableData = [
       [[accountNameText, data.accountName], [deliveryDateText, data.transactionDate]],
       [[cardTypeText, data.cardType], [requestIdText, data.transactionCode]],
       [[cardBrandText, data.cardBrand], [printDateText, data.printDate]],
       [[cardTitleText, data.accountName], [cardNumberText, data.cardNumber]],
       [[emptyText, emptyText], [emptyText, emptyText]]
    ];
    replaceTableData(tableData);
}
function setATMDebitCardCancel() {
    addClassText("title", atmDebitCardCancelText);

    addClassText(accountNoLabelId, accountNoText);
    addClassText(accountNumberId, data.accountNumber);
    addClassText(accountTypeId, data.savingsAccountType);
    addClassText(linkAccountNumberColonId, emptyText);
    addClassText(linkAccountNumberLabelId, emptyText);
    addClassText(linkAccountNumberId, emptyText);

    addClassText(customerAddressId, data.customerAddress);

    var tableData = [
       [[accountNameText, data.accountName], [deliveryDateText, data.transactionDate]],
       [[cardTypeText, data.cardType], [requestIdText, data.transactionCode]],
       [[cardBrandText, data.cardBrand], [printDateText, data.printDate]],
       [[cardTitleText, data.accountName], [cardNumberText, data.cardNumber]],
       [[emptyText, emptyText], [emptyText, emptyText]]
    ];
    replaceTableData(tableData);
}
function setChequeBookRequisition() {
    addClassText("title", chequeBookRequisitionText);

    addClassText(accountNoLabelId, accountNoText);
    addClassText(accountNumberId, data.accountNumber);
    addClassText(accountTypeId, data.savingsAccountType);
    addClassText(linkAccountNumberColonId, emptyText);
    addClassText(linkAccountNumberLabelId, emptyText);
    addClassText(linkAccountNumberId, emptyText);

    addClassText(customerAddressId, data.customerAddress);

    var tableData = [
       [[accountNameText, data.accountName], [requestReceiveTimeText, data.transactionDate]],
       [[noOfLeaveText, data.noOfLeave], [requestIdText, data.transactionCode]],
       [[chargeText, data.charge], [printDateText, data.printDate]],
       [[emptyText, emptyText], [emptyText, emptyText]],
       [[emptyText, emptyText], [emptyText, emptyText]]
    ];
    replaceTableData(tableData);
}
function setChequeBookDelivery() {
    addClassText("title", chequeBookDeliveryText);

    addClassText(accountNoLabelId, accountNoText);
    addClassText(accountNumberId, data.accountNumber);
    addClassText(accountTypeId, data.savingsAccountType);
    addClassText(linkAccountNumberColonId, emptyText);
    addClassText(linkAccountNumberLabelId, emptyText);
    addClassText(linkAccountNumberId, emptyText);

    addClassText(customerAddressId, data.customerAddress);

    var tableData = [
       [[accountNameText, data.accountName], [deliveryDateText, data.transactionDate]],
       [[noOfLeaveText, data.noOfLeave], [requestIdText, data.transactionCode]],
       [[emptyText, emptyText], [printDateText, data.printDate]],
       [[emptyText, emptyText], [emptyText, emptyText]],
       [[emptyText, emptyText], [emptyText, emptyText]]
    ];
    replaceTableData(tableData);
}
function setChequeStopPaymentSingle() {
    addClassText("title", chequeStopPaymentSingleText);

    addClassText(accountNoLabelId, accountNoText);
    addClassText(accountNumberId, data.accountNumber);
    addClassText(accountTypeId, data.savingsAccountType);
    addClassText(linkAccountNumberColonId, emptyText);
    addClassText(linkAccountNumberLabelId, emptyText);
    addClassText(linkAccountNumberId, emptyText);

    addClassText(customerAddressId, data.customerAddress);

    var tableData = [
       [[accountNameText, data.accountName], [receiverNameText, data.receiverName]],
       [[chequeLeafNumberText, data.chequeLeafNumber], [requestIdText, data.transactionCode]],
       [[amountOfTkText, data.chequeAmount], [printDateText, data.printDate]],
       [[chargeText, data.charge], [chequeLostReasonText, data.chequeLostReason]],
       [[emptyText, emptyText], [emptyText, emptyText]]
    ];
    replaceTableData(tableData);
}
function setChequeStopPaymentRange() {
    addClassText("title", chequeStopPaymentRangeText);

    addClassText(accountNoLabelId, accountNoText);
    addClassText(accountNumberId, data.accountNumber);
    addClassText(accountTypeId, data.savingsAccountType);
    addClassText(linkAccountNumberColonId, emptyText);
    addClassText(linkAccountNumberLabelId, emptyText);
    addClassText(linkAccountNumberId, emptyText);

    addClassText(customerAddressId, data.customerAddress);

    var tableData = [
       [[accountNameText, data.accountName], [requestReceiveTimeText, data.transactionDate]],
       [[chequeLeafNumberText, data.chequeLeafNumber], [requestIdText, data.transactionCode]],
       [[chargeText, data.charge], [printDateText, data.printDate]],
       [[emptyText, emptyText], [chequeLostReasonText, data.chequeLostReason]],
       [[emptyText, emptyText], [emptyText, emptyText]]
    ];
    replaceTableData(tableData);
}
function setChequeStopPaymentSingleCancel() {
    addClassText("title", chequeStopPaymentSingleCancelText);

    addClassText(accountNoLabelId, accountNoText);
    addClassText(accountNumberId, data.accountNumber);
    addClassText(accountTypeId, data.savingsAccountType);
    addClassText(linkAccountNumberColonId, emptyText);
    addClassText(linkAccountNumberLabelId, emptyText);
    addClassText(linkAccountNumberId, emptyText);

    addClassText(customerAddressId, data.customerAddress);

    var tableData = [
       [[accountNameText, data.accountName], [receiverNameText, data.receiverName]],
       [[chequeLeafNumberText, data.chequeLeafNumber], [requestIdText, data.transactionCode]],
       [[amountOfTkText, data.chequeAmount], [printDateText, data.printDate]],
       [[chargeText, data.charge], [retrieveFromText, data.retrieveFrom]],
       [[emptyText, emptyText], [emptyText, emptyText]]
    ];
    replaceTableData(tableData);
}
function setChequeStopPaymentRangeCancel() {
    addClassText("title", chequeStopPaymentRangeCancelText);

    addClassText(accountNoLabelId, accountNoText);
    addClassText(accountNumberId, data.accountNumber);
    addClassText(accountTypeId, data.savingsAccountType);
    addClassText(linkAccountNumberColonId, emptyText);
    addClassText(linkAccountNumberLabelId, emptyText);
    addClassText(linkAccountNumberId, emptyText);

    addClassText(customerAddressId, data.customerAddress);

    var tableData = [
        [[accountNameText, data.accountName], [requestReceiveTimeText, data.transactionDate]],
        [[chequeLeafNumberText, data.chequeLeafNumber], [requestIdText, data.transactionCode]],
        [[chargeText, data.charge], [printDateText, data.printDate]],
        [[emptyText, emptyText], [retrieveFromText, data.retrieveFrom]],
        [[emptyText, emptyText], [emptyText, emptyText]]
    ];
    replaceTableData(tableData);
}

function replaceTableData(tableData) {
    var fourthTable = document.getElementsByClassName('fourthTable')[0];
    for (var i = 0; i < fourthTable.rows.length; i++) {
        for (var j = 0; j < fourthTable.rows[i].cells.length; j++) {
            var text = tableData[i][j / 3][0];
            var value = tableData[i][j / 3][1];
            if (text) {
                fourthTable.rows[i].cells[j].innerHTML = text;
                fourthTable.rows[i].cells[++j].innerHTML = colonText;
            } else {
                fourthTable.rows[i].cells[j].innerHTML = emptyText;
                fourthTable.rows[i].cells[++j].innerHTML = emptyText;
            }
            fourthTable.rows[i].cells[++j].innerHTML = value;
        }
    }
}
function addImage(elementId, url, alternateUrl) {
    var elements = document.getElementsByClassName(elementId);
    if (elements != null) {
        for (var i = 0; i < elements.length; i++) {
            if (elements[i].src != null) {
                elements[i].src = url;
                elements[i].onerror = function (ele) {
                    ele.srcElement.src = alternateUrl;
                }
            }
        }
    }
}
function addClassText(elementId, innerHtml) {
    var elements = document.getElementsByClassName(elementId);

    if (elements != null) {
        for (var i = 0; i < elements.length; i++) {
            elements[i].innerHTML = innerHtml;
        }
    }
}
function addText(elementId, innerHtml) {
    var id = document.getElementById(elementId);
    if (id != null) {
        id.innerHTML = innerHtml;
    }
}
function addStyleSheet(href) {
    var head = document.head
  , link = document.createElement('link');

    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = href;

    head.appendChild(link);
}