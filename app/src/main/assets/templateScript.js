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
    }
    //console.log(window);


    addStyleSheet('style_sheet/styles.css');
    addStyleSheet('file:///android_asset/styles.css');
    replaceToken(parseInt(url));
    var i = 0;
}





var receipts = {
    ACCOUNT_BALANCE: 1,
    CASH_DEPOSIT: 2,
    CASH_WITHDRAW: 3,
    DPS_ACCOUNT: 4,
    FIXED_DEPOSIT: 5,
    FUND_TRANSFER: 6,
    SAVINGS_ACCOUNT: 7,
    ATM_DEBIT_CARD_REQUEST: 8,
    ATM_DEBIT_CARD_DELIVERY: 9,
    ATM_DEBIT_CARD_CANCEL: 10,
    CHEQUE_BOOK_REQUISITION: 11,
    CHEQUE_BOOK_DELIVERY: 12,
    CHEQUE_STOP_PAYMENT_SINGLE: 13,
    CHEQUE_STOP_PAYMENT_RANGE: 14,
    CHEQUE_STOP_PAYMENT_SINGLE_CANCEL: 15,
    CHEQUE_STOP_PAYMENT_RANGE_CANCEL: 16
};

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






var accountNoLabelId = "accountNoLabel";
var accountNumberId = "accountNumber";
var accountTypeId = "accountType";
var customerAddressId = "customerAddress";
var linkAccountNumberColonId = "linkAccountNumberColon";
var linkAccountNumberLabelId = "linkAccountNumberLabel";
var linkAccountNumberId = "linkAccountNumber";
var titleId = "title";

var t00LabelId = "t00Label";
var t00ValueId = "t00Value";
var t01LabelId = "t01Label";
var t01ValueId = "t01Value";

var t10LabelId = "t10Label";
var t10ValueId = "t10Value";
var t11LabelId = "t11Label";
var t11ValueId = "t11Value";

var t20LabelId = "t20Label";
var t20ColonId = "t20Colon";
var t20ValueId = "t20Value";
var t21LabelId = "t21Label";
var t21ColonId = "t21Colon";
var t21ValueId = "t21Value";

var t30LabelId = "t30Label";
var t30ColonId = "t30Colon";
var t30ValueId = "t30Value";
var t31LabelId = "t31Label";
var t31ColonId = "t31Colon";
var t31ValueId = "t31Value";

var t40LabelId = "t40Label";
var t40ColonId = "t40Colon";
var t40ValueId = "t40Value";
var t41LabelId = "t41Label";
var t41ColonId = "t41Colon";
var t41ValueId = "t41Value";




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
        case receipts.ACCOUNT_BALANCE:
            setAccountBalance();
            break;
        case receipts.CASH_DEPOSIT:
            setCashDeposit();
            break;
        case receipts.CASH_WITHDRAW:
            setCashWithdraw();
            break;
        case receipts.DPS_ACCOUNT:
            setDPSAccount();
            break;
        case receipts.FIXED_DEPOSIT:
            setFixedDeposit();
            break;
        case receipts.FUND_TRANSFER:
            setFundTransfer();
            break;
        case receipts.SAVINGS_ACCOUNT:
            setSavingsAccount();
            break;
        case receipts.ATM_DEBIT_CARD_REQUEST:
            setATMDebitCardRequest();
            break;
        case receipts.ATM_DEBIT_CARD_DELIVERY:
            setATMDebitCardDelivery();
            break;
        case receipts.ATM_DEBIT_CARD_CANCEL:
            setATMDebitCardCancel();
            break;
        case receipts.CHEQUE_BOOK_REQUISITION:
            setChequeBookRequisition();
            break;
        case receipts.CHEQUE_BOOK_DELIVERY:
            setChequeBookDelivery();
            break;
        case receipts.CHEQUE_STOP_PAYMENT_SINGLE:
            setChequeStopPaymentSingle();
            break;
        case receipts.CHEQUE_STOP_PAYMENT_RANGE:
            setChequeStopPaymentRange();
            break;
        case receipts.CHEQUE_STOP_PAYMENT_SINGLE_CANCEL:
            setChequeStopPaymentSingleCancel();
            break;
        case receipts.CHEQUE_STOP_PAYMENT_RANGE_CANCEL:
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

    addClassText(t00LabelId, accountNameText);
    addClassText(t00ValueId, data.accountName);
    addClassText(t01LabelId, balanceDateText);
    addClassText(t01ValueId, data.transactionDate);

    addClassText(t10LabelId, balanceAmountText);
    addClassText(t10ValueId, data.balanceAmount);
    addClassText(t11LabelId, transactionIdText);
    addClassText(t11ValueId, data.transactionCode);

    addClassText(t20LabelId, inWordsText);
    addClassText(t20ColonId, colonText);
    addClassText(t20ValueId, data.balanceAmountInWords);
    addClassText(t21LabelId, printDateText);
    addClassText(t21ColonId, colonText);
    addClassText(t21ValueId, data.printDate);

    addClassText(t30LabelId, emptyText);
    addClassText(t30ColonId, emptyText);
    addClassText(t30ValueId, emptyText);
    addClassText(t31LabelId, emptyText);
    addClassText(t31ColonId, emptyText);
    addClassText(t31ValueId, emptyText);

    addClassText(t40LabelId, emptyText);
    addClassText(t40ColonId, emptyText);
    addClassText(t40ValueId, emptyText);
    addClassText(t41LabelId, emptyText);
    addClassText(t41ColonId, emptyText);
    addClassText(t41ValueId, emptyText);
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

    addClassText(t00LabelId, accountNameText);
    addClassText(t00ValueId, data.accountName);
    addClassText(t01LabelId, depositDateText);
    addClassText(t01ValueId, data.transactionDate);

    addClassText(t10LabelId, depositAmountText);
    addClassText(t10ValueId, data.depositAmount);
    addClassText(t11LabelId, transactionIdText);
    addClassText(t11ValueId, data.transactionCode);

    addClassText(t20LabelId, inWordsText);
    addClassText(t20ColonId, colonText);
    addClassText(t20ValueId, data.depositAmountInWords);
    addClassText(t21LabelId, printDateText);
    addClassText(t21ColonId, colonText);
    addClassText(t21ValueId, data.printDate);

    addClassText(t30LabelId, emptyText);
    addClassText(t30ColonId, emptyText);
    addClassText(t30ValueId, emptyText);
    addClassText(t31LabelId, emptyText);
    addClassText(t31ColonId, emptyText);
    addClassText(t31ValueId, emptyText);

    addClassText(t40LabelId, emptyText);
    addClassText(t40ColonId, emptyText);
    addClassText(t40ValueId, emptyText);
    addClassText(t41LabelId, emptyText);
    addClassText(t41ColonId, emptyText);
    addClassText(t41ValueId, emptyText);
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

    addClassText(t00LabelId, accountNameText);
    addClassText(t00ValueId, data.accountName);
    addClassText(t01LabelId, withdrawDateText);
    addClassText(t01ValueId, data.transactionDate);

    addClassText(t10LabelId, withdrawAmountText);
    addClassText(t10ValueId, data.withdrawAmount);
    addClassText(t11LabelId, transactionIdText);
    addClassText(t11ValueId, data.transactionCode);

    addClassText(t20LabelId, inWordsText);
    addClassText(t20ColonId, colonText);
    addClassText(t20ValueId, data.withdrawsAmountInWords);
    addClassText(t21LabelId, printDateText);
    addClassText(t21ColonId, colonText);
    addClassText(t21ValueId, data.printDate);

    addClassText(t30LabelId, chargeText);
    addClassText(t30ColonId, colonText);
    addClassText(t30ValueId, data.charge);
    addClassText(t31LabelId, emptyText);
    addClassText(t31ColonId, emptyText);
    addClassText(t31ValueId, emptyText);

    addClassText(t40LabelId, emptyText);
    addClassText(t40ColonId, emptyText);
    addClassText(t40ValueId, emptyText);
    addClassText(t41LabelId, emptyText);
    addClassText(t41ColonId, emptyText);
    addClassText(t41ValueId, emptyText);
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

    addClassText(t00LabelId, accountNameText);
    addClassText(t00ValueId, data.accountName);
    addClassText(t01LabelId, productTenorText);
    addClassText(t01ValueId, data.productTenor);

    addClassText(t10LabelId, accountOpeningDateText);
    addClassText(t10ValueId, data.transactionDate);
    addClassText(t11LabelId, maturityDateText);
    addClassText(t11ValueId, data.maturityDate);

    addClassText(t20LabelId, monthlyDepositText);
    addClassText(t20ColonId, colonText);
    addClassText(t20ValueId, data.depositAmount);
    addClassText(t21LabelId, printDateText);
    addClassText(t21ColonId, colonText);
    addClassText(t21ValueId, data.printDate);

    addClassText(t30LabelId, maturityAmountText);
    addClassText(t30ColonId, colonText);
    addClassText(t30ValueId, data.maturityAmount);
    addClassText(t31LabelId, emptyText);
    addClassText(t31ColonId, emptyText);
    addClassText(t31ValueId, emptyText);

    addClassText(t40LabelId, emptyText);
    addClassText(t40ColonId, emptyText);
    addClassText(t40ValueId, emptyText);
    addClassText(t41LabelId, emptyText);
    addClassText(t41ColonId, emptyText);
    addClassText(t41ValueId, emptyText);
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

    addClassText(t00LabelId, accountNameText);
    addClassText(t00ValueId, data.accountName);
    addClassText(t01LabelId, productTenorText);
    addClassText(t01ValueId, data.productTenor);

    addClassText(t10LabelId, accountOpeningDateText);
    addClassText(t10ValueId, data.transactionDate);
    addClassText(t11LabelId, maturityDateText);
    addClassText(t11ValueId, data.maturityDate);

    addClassText(t20LabelId, profitRateText);
    addClassText(t20ColonId, colonText);
    addClassText(t20ValueId, data.profitRate);
    addClassText(t21LabelId, maturityAmountText);
    addClassText(t21ColonId, colonText);
    addClassText(t21ValueId, data.maturityAmount);

    addClassText(t30LabelId, principalAmountText);
    addClassText(t30ColonId, colonText);
    addClassText(t30ValueId, data.principalAmount);
    addClassText(t31LabelId, printDateText);
    addClassText(t31ColonId, colonText);
    addClassText(t31ValueId, data.printDate);

    addClassText(t40LabelId, emptyText);
    addClassText(t40ColonId, emptyText);
    addClassText(t40ValueId, emptyText);
    addClassText(t41LabelId, emptyText);
    addClassText(t41ColonId, emptyText);
    addClassText(t41ValueId, emptyText);
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

    addClassText(t00LabelId, sendrAccountNameText);
    addClassText(t00ValueId, data.accountName);
    addClassText(t01LabelId, fundTransferDateText);
    addClassText(t01ValueId, data.transactionDate);

    addClassText(t10LabelId, receiverAccountNameText);
    addClassText(t10ValueId, data.receiverAccountName);
    addClassText(t11LabelId, receiverAccountNoText);
    addClassText(t11ValueId, data.linkAccountNumber);

    addClassText(t20LabelId, transferAmountText);
    addClassText(t20ColonId, colonText);
    addClassText(t20ValueId, data.depositAmount);
    addClassText(t21LabelId, transactionIdText);
    addClassText(t21ColonId, colonText);
    addClassText(t21ValueId, data.transactionCode);

    addClassText(t30LabelId, inWordsText);
    addClassText(t30ColonId, colonText);
    addClassText(t30ValueId, data.depositAmountInWords);
    addClassText(t31LabelId, printDateText);
    addClassText(t31ColonId, colonText);
    addClassText(t31ValueId, data.printDate);

    addClassText(t40LabelId, emptyText);
    addClassText(t40ColonId, emptyText);
    addClassText(t40ValueId, emptyText);
    addClassText(t41LabelId, emptyText);
    addClassText(t41ColonId, emptyText);
    addClassText(t41ValueId, emptyText);
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

    addClassText(t00LabelId, accountNameText);
    addClassText(t00ValueId, data.accountName);
    addClassText(t01LabelId, initialDepositText);
    addClassText(t01ValueId, data.depositAmount);

    addClassText(t10LabelId, accountOpeningDateText);
    addClassText(t10ValueId, data.transactionDate);
    addClassText(t11LabelId, printDateText);
    addClassText(t11ValueId, data.printDate);

    addClassText(t20LabelId, emptyText);
    addClassText(t20ColonId, emptyText);
    addClassText(t20ValueId, emptyText);
    addClassText(t21LabelId, emptyText);
    addClassText(t21ColonId, emptyText);
    addClassText(t21ValueId, emptyText);

    addClassText(t30LabelId, emptyText);
    addClassText(t30ColonId, emptyText);
    addClassText(t30ValueId, emptyText);
    addClassText(t31LabelId, emptyText);
    addClassText(t31ColonId, emptyText);
    addClassText(t31ValueId, emptyText);

    addClassText(t40LabelId, emptyText);
    addClassText(t40ColonId, emptyText);
    addClassText(t40ValueId, emptyText);
    addClassText(t41LabelId, emptyText);
    addClassText(t41ColonId, emptyText);
    addClassText(t41ValueId, emptyText);
}


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



function setATMDebitCardRequest() {
    addClassText("title", atmDebitCardRequestText);

    addClassText(accountNoLabelId, accountNoText);
    addClassText(accountNumberId, data.accountNumber);
    addClassText(accountTypeId, data.savingsAccountType);
    addClassText(linkAccountNumberColonId, emptyText);
    addClassText(linkAccountNumberLabelId, emptyText);
    addClassText(linkAccountNumberId, emptyText);

    addClassText(customerAddressId, data.customerAddress);

    addClassText(t00LabelId, accountNameText);
    addClassText(t00ValueId, data.accountName);
    addClassText(t01LabelId, requestReceiveTimeText);
    addClassText(t01ValueId, data.transactionDate);

    addClassText(t10LabelId, cardTypeText);
    addClassText(t10ValueId, data.cardType);
    addClassText(t11LabelId, requestIdText);
    addClassText(t11ValueId, data.transactionCode);

    addClassText(t20LabelId, cardBrandText);
    addClassText(t20ColonId, colonText);
    addClassText(t20ValueId, data.cardBrand);
    addClassText(t21LabelId, printDateText);
    addClassText(t21ColonId, colonText);
    addClassText(t21ValueId, data.printDate);

    addClassText(t30LabelId, cardTitleText);
    addClassText(t30ColonId, colonText);
    addClassText(t30ValueId, data.accountName);
    addClassText(t31LabelId, chargeText);
    addClassText(t31ColonId, colonText);
    addClassText(t31ValueId, data.charge);

    addClassText(t40LabelId, emptyText);
    addClassText(t40ColonId, emptyText);
    addClassText(t40ValueId, emptyText);
    addClassText(t41LabelId, emptyText);
    addClassText(t41ColonId, emptyText);
    addClassText(t41ValueId, emptyText);
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

    addClassText(t00LabelId, accountNameText);
    addClassText(t00ValueId, data.accountName);
    addClassText(t01LabelId, deliveryDateText);
    addClassText(t01ValueId, data.transactionDate);

    addClassText(t10LabelId, cardTypeText);
    addClassText(t10ValueId, data.cardType);
    addClassText(t11LabelId, requestIdText);
    addClassText(t11ValueId, data.transactionCode);

    addClassText(t20LabelId, cardBrandText);
    addClassText(t20ColonId, colonText);
    addClassText(t20ValueId, data.cardBrand);
    addClassText(t21LabelId, printDateText);
    addClassText(t21ColonId, colonText);
    addClassText(t21ValueId, data.printDate);

    addClassText(t30LabelId, cardTitleText);
    addClassText(t30ColonId, colonText);
    addClassText(t30ValueId, data.accountName);
    addClassText(t31LabelId, cardNumberText);
    addClassText(t31ColonId, colonText);
    addClassText(t31ValueId, data.cardNumber);

    addClassText(t40LabelId, emptyText);
    addClassText(t40ColonId, emptyText);
    addClassText(t40ValueId, emptyText);
    addClassText(t41LabelId, emptyText);
    addClassText(t41ColonId, emptyText);
    addClassText(t41ValueId, emptyText);
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

    addClassText(t00LabelId, accountNameText);
    addClassText(t00ValueId, data.accountName);
    addClassText(t01LabelId, deliveryDateText);
    addClassText(t01ValueId, data.transactionDate);

    addClassText(t10LabelId, cardTypeText);
    addClassText(t10ValueId, data.cardType);
    addClassText(t11LabelId, requestIdText);
    addClassText(t11ValueId, data.transactionCode);

    addClassText(t20LabelId, cardBrandText);
    addClassText(t20ColonId, colonText);
    addClassText(t20ValueId, data.cardBrand);
    addClassText(t21LabelId, printDateText);
    addClassText(t21ColonId, colonText);
    addClassText(t21ValueId, data.printDate);

    addClassText(t30LabelId, cardTitleText);
    addClassText(t30ColonId, colonText);
    addClassText(t30ValueId, data.accountName);
    addClassText(t31LabelId, cardNumberText);
    addClassText(t31ColonId, colonText);
    addClassText(t31ValueId, data.cardNumber);

    addClassText(t40LabelId, emptyText);
    addClassText(t40ColonId, emptyText);
    addClassText(t40ValueId, emptyText);
    addClassText(t41LabelId, emptyText);
    addClassText(t41ColonId, emptyText);
    addClassText(t41ValueId, emptyText);
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

    addClassText(t00LabelId, accountNameText);
    addClassText(t00ValueId, data.accountName);
    addClassText(t01LabelId, requestReceiveTimeText);
    addClassText(t01ValueId, data.transactionDate);

    addClassText(t10LabelId, noOfLeaveText);
    addClassText(t10ValueId, data.noOfLeave);
    addClassText(t11LabelId, requestIdText);
    addClassText(t11ValueId, data.transactionCode);

    addClassText(t20LabelId, chargeText);
    addClassText(t20ColonId, colonText);
    addClassText(t20ValueId, data.charge);
    addClassText(t21LabelId, printDateText);
    addClassText(t21ColonId, colonText);
    addClassText(t21ValueId, data.printDate);

    addClassText(t30LabelId, emptyText);
    addClassText(t30ColonId, emptyText);
    addClassText(t30ValueId, emptyText);
    addClassText(t31LabelId, emptyText);
    addClassText(t31ColonId, emptyText);
    addClassText(t31ValueId, emptyText);

    addClassText(t40LabelId, emptyText);
    addClassText(t40ColonId, emptyText);
    addClassText(t40ValueId, emptyText);
    addClassText(t41LabelId, emptyText);
    addClassText(t41ColonId, emptyText);
    addClassText(t41ValueId, emptyText);
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

    addClassText(t00LabelId, accountNameText);
    addClassText(t00ValueId, data.accountName);
    addClassText(t01LabelId, deliveryDateText);
    addClassText(t01ValueId, data.transactionDate);

    addClassText(t10LabelId, noOfLeaveText);
    addClassText(t10ValueId, data.noOfLeave);
    addClassText(t11LabelId, requestIdText);
    addClassText(t11ValueId, data.transactionCode);

    addClassText(t20LabelId, emptyText);
    addClassText(t20ColonId, emptyText);
    addClassText(t20ValueId, emptyText);
    addClassText(t21LabelId, printDateText);
    addClassText(t21ColonId, colonText);
    addClassText(t21ValueId, data.printDate);

    addClassText(t30LabelId, emptyText);
    addClassText(t30ColonId, emptyText);
    addClassText(t30ValueId, emptyText);
    addClassText(t31LabelId, emptyText);
    addClassText(t31ColonId, emptyText);
    addClassText(t31ValueId, emptyText);

    addClassText(t40LabelId, emptyText);
    addClassText(t40ColonId, emptyText);
    addClassText(t40ValueId, emptyText);
    addClassText(t41LabelId, emptyText);
    addClassText(t41ColonId, emptyText);
    addClassText(t41ValueId, emptyText);
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

    addClassText(t00LabelId, accountNameText);
    addClassText(t00ValueId, data.accountName);
    addClassText(t01LabelId, receiverNameText);
    addClassText(t01ValueId, data.receiverName);

    addClassText(t10LabelId, chequeLeafNumberText);
    addClassText(t10ValueId, data.chequeLeafNumber);
    addClassText(t11LabelId, requestIdText);
    addClassText(t11ValueId, data.transactionCode);

    addClassText(t20LabelId, amountOfTkText);
    addClassText(t20ColonId, colonText);
    addClassText(t20ValueId, data.chequeAmount);
    addClassText(t21LabelId, printDateText);
    addClassText(t21ColonId, colonText);
    addClassText(t21ValueId, data.printDate);

    addClassText(t30LabelId, chargeText);
    addClassText(t30ColonId, colonText);
    addClassText(t30ValueId, data.charge);
    addClassText(t31LabelId, chequeLostReasonText);
    addClassText(t31ColonId, colonText);
    addClassText(t31ValueId, data.chequeLostReason);

    addClassText(t40LabelId, emptyText);
    addClassText(t40ColonId, emptyText);
    addClassText(t40ValueId, emptyText);
    addClassText(t41LabelId, emptyText);
    addClassText(t41ColonId, emptyText);
    addClassText(t41ValueId, emptyText);
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

    addClassText(t00LabelId, accountNameText);
    addClassText(t00ValueId, data.accountName);
    addClassText(t01LabelId, requestReceiveTimeText);
    addClassText(t01ValueId, data.transactionDate);

    addClassText(t10LabelId, chequeLeafNumberText);
    addClassText(t10ValueId, data.chequeLeafNumber);
    addClassText(t11LabelId, requestIdText);
    addClassText(t11ValueId, data.transactionCode);

    addClassText(t20LabelId, chargeText);
    addClassText(t20ColonId, colonText);
    addClassText(t20ValueId, data.charge);
    addClassText(t21LabelId, printDateText);
    addClassText(t21ColonId, colonText);
    addClassText(t21ValueId, data.printDate);

    addClassText(t30LabelId, emptyText);
    addClassText(t30ColonId, emptyText);
    addClassText(t30ValueId, emptyText);
    addClassText(t31LabelId, chequeLostReasonText);
    addClassText(t31ColonId, colonText);
    addClassText(t31ValueId, data.chequeLostReason);

    addClassText(t40LabelId, emptyText);
    addClassText(t40ColonId, emptyText);
    addClassText(t40ValueId, emptyText);
    addClassText(t41LabelId, emptyText);
    addClassText(t41ColonId, emptyText);
    addClassText(t41ValueId, emptyText);
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

    addClassText(t00LabelId, accountNameText);
    addClassText(t00ValueId, data.accountName);
    addClassText(t01LabelId, receiverNameText);
    addClassText(t01ValueId, data.receiverName);

    addClassText(t10LabelId, chequeLeafNumberText);
    addClassText(t10ValueId, data.chequeLeafNumber);
    addClassText(t11LabelId, requestIdText);
    addClassText(t11ValueId, data.transactionCode);

    addClassText(t20LabelId, amountOfTkText);
    addClassText(t20ColonId, colonText);
    addClassText(t20ValueId, data.chequeAmount);
    addClassText(t21LabelId, printDateText);
    addClassText(t21ColonId, colonText);
    addClassText(t21ValueId, data.printDate);

    addClassText(t30LabelId, chargeText);
    addClassText(t30ColonId, colonText);
    addClassText(t30ValueId, data.charge);
    addClassText(t31LabelId, retrieveFromText);
    addClassText(t31ColonId, colonText);
    addClassText(t31ValueId, data.retrieveFrom);

    addClassText(t40LabelId, emptyText);
    addClassText(t40ColonId, emptyText);
    addClassText(t40ValueId, emptyText);
    addClassText(t41LabelId, emptyText);
    addClassText(t41ColonId, emptyText);
    addClassText(t41ValueId, emptyText);
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

    addClassText(t00LabelId, accountNameText);
    addClassText(t00ValueId, data.accountName);
    addClassText(t01LabelId, requestReceiveTimeText);
    addClassText(t01ValueId, data.transactionDate);

    addClassText(t10LabelId, chequeLeafNumberText);
    addClassText(t10ValueId, data.chequeLeafNumber);
    addClassText(t11LabelId, requestIdText);
    addClassText(t11ValueId, data.transactionCode);

    addClassText(t20LabelId, chargeText);
    addClassText(t20ColonId, colonText);
    addClassText(t20ValueId, data.charge);
    addClassText(t21LabelId, printDateText);
    addClassText(t21ColonId, colonText);
    addClassText(t21ValueId, data.printDate);

    addClassText(t30LabelId, emptyText);
    addClassText(t30ColonId, emptyText);
    addClassText(t30ValueId, emptyText);
    addClassText(t31LabelId, retrieveFromText);
    addClassText(t31ColonId, colonText);
    addClassText(t31ValueId, data.retrieveFrom);

    addClassText(t40LabelId, emptyText);
    addClassText(t40ColonId, emptyText);
    addClassText(t40ValueId, emptyText);
    addClassText(t41LabelId, emptyText);
    addClassText(t41ColonId, emptyText);
    addClassText(t41ValueId, emptyText);
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