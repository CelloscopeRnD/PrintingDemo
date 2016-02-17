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
            "receiverName": "Asadul Haque", "chequeLostReason": "Lost", "retrieveFrom": "From Lost",
            "photo": "", "statement": [
                ['Date', 'Description', 'Deposit', 'Withdraw', 'Balance'],
                ['15-Dec-2016', 'FT-School Fee', '', '500.00', '4500.00'],
                ['14-Dec-2016', 'DEP Cash', '1500.00', '', '6000.00'],
                ['14-Dec-2016', 'WDL-Cash', '', '2000.00', '4000.00'],
                ['13-Dec-2016', 'FT-Other Bank', '', '2000.00', '2000.00'],
                ['12-Dec-2016', 'DEP-Personal A/C', '7000.00', '', '9000.00']]
        };
    }

    addStyleSheet('style_sheet/styles.css'); addStyleSheet('file:///android_asset/styles.css');
    replaceToken(parseInt(url));
}

function setData() {
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
        case 17:
            setMiniStatement();
            break;
        case 18:
            setRemittanceRequest();
            break;
        case 19:
            setRemittanceWithdraw();
            break;
        default:
            break;
    }
}

var labelText = {

    accountNoLabelId: "accountNoLabel",
    accountNumberId: "accountNumber",
    accountTypeId: "accountType",
    customerAddressId: "customerAddress",
    linkAccountNumberColonId: "linkAccountNumberColon",
    linkAccountNumberLabelId: "linkAccountNumberLabel",
    linkAccountNumberId: "linkAccountNumber",
    titleId: "title",

    titleId: "হিসাব নম্বর",
    accountNameText: "হিসাব নাম",
    accountBalanceText: "ব্যালান্স",
    accountOpeningDateText: "হিসাব খোলার তারিখ",
    accountTypeText: "হিসাবের ধরন",
    addressLine1Text: "এজেন্ট ব্যাংকিং ডিভিশন",
    addressLine2Text: "সিটি ব্যাংক লিঃ",
    addressLine3Text: "সিটি ব্যাংক  সেন্টার ১৩৬",
    addressLine4Text: "গুলশান এভিনিউ, ঢাকা-১২১২",
    addressText: "ঠিকানা",
    agentNameText: "এজেন্টের নাম",
    atmDebitCardCancelText: "এটিএম / ডেবিট কার্ড বাতিলকরন",
    atmDebitCardDeliveryText: "এটিএম / ডেবিট কার্ড হস্তান্তর",
    atmDebitCardRequestText: "এটিএম / ডেবিটি কার্ডের অনুরোধ",
    balanceAmountText: "ব্যালান্সের পরিমান",
    balanceDateText: "ব্যালান্সের তারিখ",
    chargeText: "চার্জ",
    cashDepositText: "নগদ জমা",
    cashWithdrawText: "নগদ উত্তোলন",
    chequeBookDeliveryText: "চেক বই হস্তান্তর",
    chequeBookRequisitionText: "চেক বই প্রদানের অনুরোধ",
    chequeStopPaymentSingleCancelText: "চেক স্টপ পেমেন্ট - সিঙ্গেল নির্দেশনা বাতিলকরন",
    chequeStopPaymentRangeCancelText: "চেক স্টপ পেমেন্ট - রেঞ্জ নির্দেশনা বাতিলকরন",
    chequeStopPaymentRangeText: "চেক স্টপ পেমেন্ট নির্দেশনা - রেঞ্জ",
    chequeStopPaymentSingleText: "চেক স্টপ পেমেন্ট নির্দেশনা - সিঙ্গেল",
    cityAgentFixedDepositText: "সিটি এজেন্ট ফিক্সড ডিপোজিট",
    cityAgentSavingsAccountText: "সিটি এজেন্ট সেভিংস হিসাব",
    colonText: ":",
    customerIdText: "গ্রাহক আইডি",
    customerNameText: "গ্রাহকের নাম",
    depositAmountText: "জমার পরিমান",
    depositDateText: "জমার তারিখ",
    emptyText: "",
    fundTransferDateText: "ফান্ড ট্রান্সফারের তারিখ",
    fundTransferText: "ফান্ড ট্রান্সফার",
    generalDPSAccountText: "সাধারন ডিপিএস হিসাব",
    initialDepositText: "প্রারম্ভিক জমার পরিমান",
    inWordsText: "কথায়",
    linkAccountNumberText: "লিংক হিসাব নম্বর",
    maturityAmountText: "মেয়াদান্তে টাকার পরিমান",
    maturityDateText: "মেয়াদান্তের তারিখ",
    mobileNoText: "মোবাইল নং",
    monthlyDepositText: "মাসিক জমা",
    profitRateText: "মুনাফার হার",
    printDateText: "প্রিন্টের তারিখ",
    principalAmountText: "আসল টাকার পরিমান",
    productTenorText: "মেয়াদ",
    receiverAccountNoText: "প্রাপকের হিসাব নম্বর",
    receiverAccountNameText: "প্রাপকের হিসাব নাম",
    senderAccountNoText: "প্রেরকের হিসাব নম্বর",
    sendrAccountNameText: "প্রেরকের হিসাব নাম",
    transferAmountText: "ট্রান্সফারের পরিমান",
    transactionIdText: "লেনদেন আইডি",
    userText: "ইউজার",
    withdrawAmountText: "উত্তোলনের পরিমান",
    withdrawDateText: "উত্তোলনের তারিখ",

    cardTypeText: "কার্ডের ধরণ",
    requestReceiveTimeText: "অনুরোধ গ্রহনের সময়",
    requestIdText: "অনুরোধ আইডি",
    cardTitleText: "কার্ড টাইটেল",
    cardBrandText: "কার্ডের ব্রান্ড",
    cardNumberText: "কার্ড নম্বর",
    deliveryDateText: "হস্তান্তরের তারিখ",
    noOfLeaveText: "পাতার সংখ্যা",
    chequeLostReasonText: "চেকটি",
    chequeLeafNumberText: "চেক পাতার নম্বর",
    amountOfTkText: "টাকার পরিমান",
    receiverNameText: "প্রাপকের নাম",
    retrieveFromText: "পুনরুদ্ধার হয়েছে",

    addressTextEnglish: "Address",
    agentNameTextEnglish: "Agent Name",
    amountInWordsTextEnglish: "Amount in Words",
    apprxAmountTextEnglish: "Apprx.  Amount",
    currencyTextEnglish: "Currency",
    exchangeRateTextEnglish: "Exchange Rate",
    fxAmountTextEnglish: "Fx Amount",
    iDTypeTextEnglish: "ID Type",
    iDNumberTextEnglish: "ID Number",
    inwardForeignRemittanceRequestTextEnglish: "Inward Foreign Remittance Request",
    inwardForeignRemittanceWithdrawTextEnglish: "Inward Foreign Remittance Withdraw",
    mobileNoTextEnglish: "Mobile No",
    exchangeHouseNameEnglish: "Exchange House Name",
    payableAmountTextEnglish: "Payable Amount",
    pinNoTextEnglish: "Pin No",
    printDateTextEnglish: "Print Date",
    recipientNameTextEnglish: "Recipient Name",
    senderCountryTextEnglish: "Sender Country",
    senderNameTextEnglish: "Sender Name",
    transactionIdTextEnglish: "Transaction Id",
    userTextEnglish: "User",
}



function replaceToken(receipt) {
    addImage("agent_banking_logo", "file:///android_asset/AGENT-BANKING-LOGO_Small.png", "images/AGENT-BANKING-LOGO_Small.png");
    addImage("logo", "file:///android_asset/logo.gif", "images/logo.png");
    addImage("qr", "qr.png", "images/qr.png");
    addImage("customerPhoto", "photo.png", "images/photo.png");

    addClassText("addressLine1Label", labelText.addressLine1Text);
    addClassText("addressLine2Label", labelText.addressLine2Text);
    addClassText("addressLine3Label", labelText.addressLine3Text);
    addClassText("addressLine4Label", labelText.addressLine4Text);



    addClassText("customerIdLabel", labelText.customerIdText);
    addClassText("customerId", data.customerId);
    addClassText("accountTypeLabel", labelText.accountTypeText);

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
        case 17:
            setMiniStatement();
            break;
        case 18:
            setRemittanceRequest();
            break;
        case 19:
            setRemittanceWithdraw();
            break;
        default:
            break;
    }
}
function setAccountBalance() {
    addClassText("agentNameLabel", labelText.agentNameText);
    addClassText("agentName", data.agentName);
    addClassText("userIdLabel", labelText.userText);
    addClassText("userId", data.userId);
    addClassText("boothAddressLabel", labelText.addressText);
    addClassText("boothAddress", data.boothAddress);

    addClassText(labelText.titleId, labelText.accountBalanceText);

    addClassText(labelText.accountNoLabelId, labelText.titleId);
    addClassText(labelText.accountNumberId, data.accountNumber);
    addClassText(labelText.accountTypeId, data.savingsAccountType);
    addClassText(labelText.linkAccountNumberColonId, labelText.emptyText);
    addClassText(labelText.linkAccountNumberLabelId, labelText.emptyText);
    addClassText(labelText.linkAccountNumberId, labelText.emptyText);

    addClassText("customerNameLabel", labelText.customerNameText);
    addClassText("customerName", data.customerName);
    addClassText("mobileNoLabel", labelText.mobileNoText);
    addClassText("mobileNo", data.mobileNo);
    addClassText("customerAddressLabel", labelText.addressText);
    addClassText(labelText.customerAddressId, data.customerAddress);

    var tableData = [
        [[labelText.accountNameText, data.accountName], [labelText.balanceDateText, data.transactionDate]],
        [[labelText.balanceAmountText, data.balanceAmount], [labelText.transactionIdText, data.transactionCode]],
        [[labelText.inWordsText, data.balanceAmountInWords], [labelText.printDateText, data.printDate]],
        [[labelText.emptyText, labelText.emptyText], [labelText.emptyText, labelText.emptyText]],
        [[labelText.emptyText, labelText.emptyText], [labelText.emptyText, labelText.emptyText]]
    ];
    replaceTableData(tableData);
}
function setCashDeposit() {
    addClassText("agentNameLabel", labelText.agentNameText);
    addClassText("agentName", data.agentName);
    addClassText("userIdLabel", labelText.userText);
    addClassText("userId", data.userId);
    addClassText("boothAddressLabel", labelText.addressText);
    addClassText("boothAddress", data.boothAddress);

    addClassText("title", labelText.cashDepositText);

    addClassText(labelText.accountNoLabelId, labelText.titleId);
    addClassText(labelText.accountNumberId, data.accountNumber);
    addClassText(labelText.accountTypeId, data.savingsAccountType);
    addClassText(labelText.linkAccountNumberColonId, labelText.emptyText);
    addClassText(labelText.linkAccountNumberLabelId, labelText.emptyText);
    addClassText(labelText.linkAccountNumberId, labelText.emptyText);

    addClassText("customerNameLabel", labelText.customerNameText);
    addClassText("customerName", data.customerName);
    addClassText("mobileNoLabel", labelText.mobileNoText);
    addClassText("mobileNo", data.mobileNo);
    addClassText("customerAddressLabel", labelText.addressText);
    addClassText(labelText.customerAddressId, data.customerAddress);

    var tableData = [
       [[labelText.accountNameText, data.accountName], [labelText.depositDateText, data.transactionDate]],
       [[labelText.depositAmountText, data.depositAmount], [labelText.transactionIdText, data.transactionCode]],
       [[labelText.inWordsText, data.depositAmountInWords], [labelText.printDateText, data.printDate]],
       [[labelText.emptyText, labelText.emptyText], [labelText.emptyText, labelText.emptyText]],
       [[labelText.emptyText, labelText.emptyText], [labelText.emptyText, labelText.emptyText]]
    ];
    replaceTableData(tableData);
}
function setCashWithdraw() {
    addClassText("agentNameLabel", labelText.agentNameText);
    addClassText("agentName", data.agentName);
    addClassText("userIdLabel", labelText.userText);
    addClassText("userId", data.userId);
    addClassText("boothAddressLabel", labelText.addressText);
    addClassText("boothAddress", data.boothAddress);

    addClassText("title", labelText.cashWithdrawText);

    addClassText(labelText.accountNoLabelId, labelText.titleId);
    addClassText(labelText.accountNumberId, data.accountNumber);
    addClassText(labelText.accountTypeId, data.savingsAccountType);
    addClassText(labelText.linkAccountNumberColonId, labelText.emptyText);
    addClassText(labelText.linkAccountNumberLabelId, labelText.emptyText);
    addClassText(labelText.linkAccountNumberId, labelText.emptyText);

    addClassText("customerNameLabel", labelText.customerNameText);
    addClassText("customerName", data.customerName);
    addClassText("mobileNoLabel", labelText.mobileNoText);
    addClassText("mobileNo", data.mobileNo);
    addClassText("customerAddressLabel", labelText.addressText);
    addClassText(labelText.customerAddressId, data.customerAddress);

    var tableData = [
       [[labelText.accountNameText, data.accountName], [labelText.withdrawDateText, data.transactionDate]],
       [[labelText.withdrawAmountText, data.withdrawAmount], [labelText.transactionIdText, data.transactionCode]],
       [[labelText.inWordsText, data.withdrawsAmountInWords], [labelText.printDateText, data.printDate]],
       [[labelText.chargeText, data.charge], [labelText.emptyText, labelText.emptyText]],
       [[labelText.emptyText, labelText.emptyText], [labelText.emptyText, labelText.emptyText]]
    ];
    replaceTableData(tableData);
}
function setDPSAccount() {
    addClassText("agentNameLabel", labelText.agentNameText);
    addClassText("agentName", data.agentName);
    addClassText("userIdLabel", labelText.userText);
    addClassText("userId", data.userId);
    addClassText("boothAddressLabel", labelText.addressText);
    addClassText("boothAddress", data.boothAddress);

    addClassText("title", labelText.generalDPSAccountText);

    addClassText(labelText.accountNoLabelId, labelText.titleId);
    addClassText(labelText.accountNumberId, labelText.emptyText);
    addClassText(labelText.accountTypeId, data.dpsAccountType);
    addClassText(labelText.linkAccountNumberLabelId, labelText.linkAccountNumberText);
    addClassText(labelText.linkAccountNumberColonId, labelText.colonText);
    addClassText(labelText.linkAccountNumberId, data.linkAccountNumber);

    addClassText("customerNameLabel", labelText.customerNameText);
    addClassText("customerName", data.customerName);
    addClassText("mobileNoLabel", labelText.mobileNoText);
    addClassText("mobileNo", data.mobileNo);
    addClassText("customerAddressLabel", labelText.addressText);
    addClassText(labelText.customerAddressId, data.customerAddress);

    var tableData = [
       [[labelText.accountNameText, data.accountName], [labelText.productTenorText, data.productTenor]],
       [[labelText.accountOpeningDateText, data.transactionDate], [labelText.maturityDateText, data.maturityDate]],
       [[labelText.monthlyDepositText, data.depositAmount], [labelText.printDateText, data.printDate]],
       [[labelText.maturityAmountText, data.maturityAmount], [labelText.emptyText, labelText.emptyText]],
       [[labelText.emptyText, labelText.emptyText], [labelText.emptyText, labelText.emptyText]]
    ];
    replaceTableData(tableData);
}
function setFixedDeposit() {
    addClassText("agentNameLabel", labelText.agentNameText);
    addClassText("agentName", data.agentName);
    addClassText("userIdLabel", labelText.userText);
    addClassText("userId", data.userId);
    addClassText("boothAddressLabel", labelText.addressText);
    addClassText("boothAddress", data.boothAddress);

    addClassText("title", labelText.cityAgentFixedDepositText);

    addClassText(labelText.accountNoLabelId, labelText.titleId);
    addClassText(labelText.accountNumberId, labelText.emptyText);
    addClassText(labelText.accountTypeId, data.termDepositAccountType);
    addClassText(labelText.linkAccountNumberLabelId, labelText.linkAccountNumberText);
    addClassText(labelText.linkAccountNumberColonId, labelText.colonText);
    addClassText(labelText.linkAccountNumberId, data.linkAccountNumber);

    addClassText("customerNameLabel", labelText.customerNameText);
    addClassText("customerName", data.customerName);
    addClassText("mobileNoLabel", labelText.mobileNoText);
    addClassText("mobileNo", data.mobileNo);
    addClassText("customerAddressLabel", labelText.addressText);
    addClassText(labelText.customerAddressId, data.customerAddress);

    var tableData = [
       [[labelText.accountNameText, data.accountName], [labelText.productTenorText, data.productTenor]],
       [[labelText.accountOpeningDateText, data.transactionDate], [labelText.maturityDateText, data.maturityDate]],
       [[labelText.profitRateText, data.profitRate], [labelText.maturityAmountText, data.maturityAmount]],
       [[labelText.principalAmountText, data.principalAmount], [labelText.printDateText, data.printDate]],
       [[labelText.emptyText, labelText.emptyText], [labelText.emptyText, labelText.emptyText]]
    ];
    replaceTableData(tableData);
}
function setFundTransfer() {
    addClassText("agentNameLabel", labelText.agentNameText);
    addClassText("agentName", data.agentName);
    addClassText("userIdLabel", labelText.userText);
    addClassText("userId", data.userId);
    addClassText("boothAddressLabel", labelText.addressText);
    addClassText("boothAddress", data.boothAddress);

    addClassText("title", labelText.fundTransferText);

    addClassText(labelText.accountNoLabelId, labelText.senderAccountNoText);
    addClassText(labelText.accountNumberId, data.accountNumber);
    addClassText(labelText.accountNumberId, data.accountNumber);
    addClassText(labelText.accountTypeId, data.savingsAccountType);
    addClassText(labelText.linkAccountNumberLabelId, labelText.emptyText);
    addClassText(labelText.linkAccountNumberColonId, labelText.emptyText);
    addClassText(labelText.linkAccountNumberId, labelText.emptyText);

    addClassText("customerNameLabel", labelText.customerNameText);
    addClassText("customerName", data.customerName);
    addClassText("mobileNoLabel", labelText.mobileNoText);
    addClassText("mobileNo", data.mobileNo);
    addClassText("customerAddressLabel", labelText.addressText);
    addClassText(labelText.customerAddressId, data.customerAddress);

    var tableData = [
       [[labelText.sendrAccountNameText, data.accountName], [labelText.fundTransferDateText, data.transactionDate]],
       [[labelText.receiverAccountNameText, data.receiverAccountName], [labelText.receiverAccountNoText, data.linkAccountNumber]],
       [[labelText.transferAmountText, data.depositAmount], [labelText.transactionIdText, data.transactionCode]],
       [[labelText.inWordsText, data.depositAmountInWords], [labelText.printDateText, data.printDate]],
       [[labelText.emptyText, labelText.emptyText], [labelText.emptyText, labelText.emptyText]]
    ];
    replaceTableData(tableData);
}
function setSavingsAccount() {
    addClassText("agentNameLabel", labelText.agentNameText);
    addClassText("agentName", data.agentName);
    addClassText("userIdLabel", labelText.userText);
    addClassText("userId", data.userId);
    addClassText("boothAddressLabel", labelText.addressText);
    addClassText("boothAddress", data.boothAddress);

    addClassText("title", labelText.cityAgentSavingsAccountText);

    addClassText(labelText.accountNoLabelId, labelText.titleId);
    addClassText(labelText.accountNumberId, data.accountNumber);
    addClassText(labelText.accountTypeId, data.savingsAccountType);
    addClassText(labelText.linkAccountNumberColonId, labelText.emptyText);
    addClassText(labelText.linkAccountNumberLabelId, labelText.emptyText);
    addClassText(labelText.linkAccountNumberId, labelText.emptyText);

    addClassText("customerNameLabel", labelText.customerNameText);
    addClassText("customerName", data.customerName);
    addClassText("mobileNoLabel", labelText.mobileNoText);
    addClassText("mobileNo", data.mobileNo);
    addClassText("customerAddressLabel", labelText.addressText);
    addClassText(labelText.customerAddressId, data.customerAddress);

    var tableData = [
       [[labelText.accountNameText, data.accountName], [labelText.initialDepositText, data.depositAmount]],
       [[labelText.accountOpeningDateText, data.transactionDate], [labelText.printDateText, data.printDate]],
       [[labelText.emptyText, labelText.emptyText], [labelText.emptyText, labelText.emptyText]],
       [[labelText.emptyText, labelText.emptyText], [labelText.emptyText, labelText.emptyText]],
       [[labelText.emptyText, labelText.emptyText], [labelText.emptyText, labelText.emptyText]]
    ];
    replaceTableData(tableData);
}

function setATMDebitCardRequest() {
    addClassText("agentNameLabel", labelText.agentNameText);
    addClassText("agentName", data.agentName);
    addClassText("userIdLabel", labelText.userText);
    addClassText("userId", data.userId);
    addClassText("boothAddressLabel", labelText.addressText);
    addClassText("boothAddress", data.boothAddress);

    addClassText("title", labelText.atmDebitCardRequestText);

    addClassText(labelText.accountNoLabelId, labelText.titleId);
    addClassText(labelText.accountNumberId, data.accountNumber);
    addClassText(labelText.accountTypeId, data.savingsAccountType);
    addClassText(labelText.linkAccountNumberColonId, labelText.emptyText);
    addClassText(labelText.linkAccountNumberLabelId, labelText.emptyText);
    addClassText(labelText.linkAccountNumberId, labelText.emptyText);

    addClassText("customerNameLabel", labelText.customerNameText);
    addClassText("customerName", data.customerName);
    addClassText("mobileNoLabel", labelText.mobileNoText);
    addClassText("mobileNo", data.mobileNo);
    addClassText("customerAddressLabel", labelText.addressText);
    addClassText(labelText.customerAddressId, data.customerAddress);

    var tableData = [
       [[labelText.accountNameText, data.accountName], [labelText.requestReceiveTimeText, data.transactionDate]],
       [[labelText.cardTypeText, data.cardType], [labelText.requestIdText, data.transactionCode]],
       [[labelText.cardBrandText, data.cardBrand], [labelText.printDateText, data.printDate]],
       [[labelText.cardTitleText, data.accountName], [labelText.chargeText, data.charge]],
       [[labelText.emptyText, labelText.emptyText], [labelText.emptyText, labelText.emptyText]]
    ];
    replaceTableData(tableData);
}
function setATMDebitCardDelivery() {
    addClassText("agentNameLabel", labelText.agentNameText);
    addClassText("agentName", data.agentName);
    addClassText("userIdLabel", labelText.userText);
    addClassText("userId", data.userId);
    addClassText("boothAddressLabel", labelText.addressText);
    addClassText("boothAddress", data.boothAddress);

    addClassText("title", labelText.atmDebitCardDeliveryText);

    addClassText(labelText.accountNoLabelId, labelText.titleId);
    addClassText(labelText.accountNumberId, data.accountNumber);
    addClassText(labelText.accountTypeId, data.savingsAccountType);
    addClassText(labelText.linkAccountNumberColonId, labelText.emptyText);
    addClassText(labelText.linkAccountNumberLabelId, labelText.emptyText);
    addClassText(labelText.linkAccountNumberId, labelText.emptyText);

    addClassText("customerNameLabel", labelText.customerNameText);
    addClassText("customerName", data.customerName);
    addClassText("mobileNoLabel", labelText.mobileNoText);
    addClassText("mobileNo", data.mobileNo);
    addClassText("customerAddressLabel", labelText.addressText);
    addClassText(labelText.customerAddressId, data.customerAddress);

    var tableData = [
       [[labelText.accountNameText, data.accountName], [labelText.deliveryDateText, data.transactionDate]],
       [[labelText.cardTypeText, data.cardType], [labelText.requestIdText, data.transactionCode]],
       [[labelText.cardBrandText, data.cardBrand], [labelText.printDateText, data.printDate]],
       [[labelText.cardTitleText, data.accountName], [labelText.cardNumberText, data.cardNumber]],
       [[labelText.emptyText, labelText.emptyText], [labelText.emptyText, labelText.emptyText]]
    ];
    replaceTableData(tableData);
}
function setATMDebitCardCancel() {
    addClassText("agentNameLabel", labelText.agentNameText);
    addClassText("agentName", data.agentName);
    addClassText("userIdLabel", labelText.userText);
    addClassText("userId", data.userId);
    addClassText("boothAddressLabel", labelText.addressText);
    addClassText("boothAddress", data.boothAddress);

    addClassText("title", labelText.atmDebitCardCancelText);

    addClassText(labelText.accountNoLabelId, labelText.titleId);
    addClassText(labelText.accountNumberId, data.accountNumber);
    addClassText(labelText.accountTypeId, data.savingsAccountType);
    addClassText(labelText.linkAccountNumberColonId, labelText.emptyText);
    addClassText(labelText.linkAccountNumberLabelId, labelText.emptyText);
    addClassText(labelText.linkAccountNumberId, labelText.emptyText);

    addClassText("customerNameLabel", labelText.customerNameText);
    addClassText("customerName", data.customerName);
    addClassText("mobileNoLabel", labelText.mobileNoText);
    addClassText("mobileNo", data.mobileNo);
    addClassText("customerAddressLabel", labelText.addressText);
    addClassText(labelText.customerAddressId, data.customerAddress);

    var tableData = [
       [[labelText.accountNameText, data.accountName], [labelText.deliveryDateText, data.transactionDate]],
       [[labelText.cardTypeText, data.cardType], [labelText.requestIdText, data.transactionCode]],
       [[labelText.cardBrandText, data.cardBrand], [labelText.printDateText, data.printDate]],
       [[labelText.cardTitleText, data.accountName], [labelText.cardNumberText, data.cardNumber]],
       [[labelText.emptyText, labelText.emptyText], [labelText.emptyText, labelText.emptyText]]
    ];
    replaceTableData(tableData);
}
function setChequeBookRequisition() {
    addClassText("agentNameLabel", labelText.agentNameText);
    addClassText("agentName", data.agentName);
    addClassText("userIdLabel", labelText.userText);
    addClassText("userId", data.userId);
    addClassText("boothAddressLabel", labelText.addressText);
    addClassText("boothAddress", data.boothAddress);

    addClassText("title", labelText.chequeBookRequisitionText);

    addClassText(labelText.accountNoLabelId, labelText.titleId);
    addClassText(labelText.accountNumberId, data.accountNumber);
    addClassText(labelText.accountTypeId, data.savingsAccountType);
    addClassText(labelText.linkAccountNumberColonId, labelText.emptyText);
    addClassText(labelText.linkAccountNumberLabelId, labelText.emptyText);
    addClassText(labelText.linkAccountNumberId, labelText.emptyText);

    addClassText("customerNameLabel", labelText.customerNameText);
    addClassText("customerName", data.customerName);
    addClassText("mobileNoLabel", labelText.mobileNoText);
    addClassText("mobileNo", data.mobileNo);
    addClassText("customerAddressLabel", labelText.addressText);
    addClassText(labelText.customerAddressId, data.customerAddress);

    var tableData = [
       [[labelText.accountNameText, data.accountName], [labelText.requestReceiveTimeText, data.transactionDate]],
       [[labelText.noOfLeaveText, data.noOfLeave], [labelText.requestIdText, data.transactionCode]],
       [[labelText.chargeText, data.charge], [labelText.printDateText, data.printDate]],
       [[labelText.emptyText, labelText.emptyText], [labelText.emptyText, labelText.emptyText]],
       [[labelText.emptyText, labelText.emptyText], [labelText.emptyText, labelText.emptyText]]
    ];
    replaceTableData(tableData);
}
function setChequeBookDelivery() {
    addClassText("agentNameLabel", labelText.agentNameText);
    addClassText("agentName", data.agentName);
    addClassText("userIdLabel", labelText.userText);
    addClassText("userId", data.userId);
    addClassText("boothAddressLabel", labelText.addressText);
    addClassText("boothAddress", data.boothAddress);

    addClassText("title", labelText.chequeBookDeliveryText);

    addClassText(labelText.accountNoLabelId, labelText.titleId);
    addClassText(labelText.accountNumberId, data.accountNumber);
    addClassText(labelText.accountTypeId, data.savingsAccountType);
    addClassText(labelText.linkAccountNumberColonId, labelText.emptyText);
    addClassText(labelText.linkAccountNumberLabelId, labelText.emptyText);
    addClassText(labelText.linkAccountNumberId, labelText.emptyText);

    addClassText("customerNameLabel", labelText.customerNameText);
    addClassText("customerName", data.customerName);
    addClassText("mobileNoLabel", labelText.mobileNoText);
    addClassText("mobileNo", data.mobileNo);
    addClassText("customerAddressLabel", labelText.addressText);
    addClassText(labelText.customerAddressId, data.customerAddress);

    var tableData = [
       [[labelText.accountNameText, data.accountName], [labelText.deliveryDateText, data.transactionDate]],
       [[labelText.noOfLeaveText, data.noOfLeave], [labelText.requestIdText, data.transactionCode]],
       [[labelText.emptyText, labelText.emptyText], [labelText.printDateText, data.printDate]],
       [[labelText.emptyText, labelText.emptyText], [labelText.emptyText, labelText.emptyText]],
       [[labelText.emptyText, labelText.emptyText], [labelText.emptyText, labelText.emptyText]]
    ];
    replaceTableData(tableData);
}
function setChequeStopPaymentSingle() {
    addClassText("agentNameLabel", labelText.agentNameText);
    addClassText("agentName", data.agentName);
    addClassText("userIdLabel", labelText.userText);
    addClassText("userId", data.userId);
    addClassText("boothAddressLabel", labelText.addressText);
    addClassText("boothAddress", data.boothAddress);

    addClassText("title", labelText.chequeStopPaymentSingleText);

    addClassText(labelText.accountNoLabelId, labelText.titleId);
    addClassText(labelText.accountNumberId, data.accountNumber);
    addClassText(labelText.accountTypeId, data.savingsAccountType);
    addClassText(labelText.linkAccountNumberColonId, labelText.emptyText);
    addClassText(labelText.linkAccountNumberLabelId, labelText.emptyText);
    addClassText(labelText.linkAccountNumberId, labelText.emptyText);

    addClassText("customerNameLabel", labelText.customerNameText);
    addClassText("customerName", data.customerName);
    addClassText("mobileNoLabel", labelText.mobileNoText);
    addClassText("mobileNo", data.mobileNo);
    addClassText("customerAddressLabel", labelText.addressText);
    addClassText(labelText.customerAddressId, data.customerAddress);

    var tableData = [
       [[labelText.accountNameText, data.accountName], [labelText.receiverNameText, data.receiverName]],
       [[labelText.chequeLeafNumberText, data.chequeLeafNumber], [labelText.requestIdText, data.transactionCode]],
       [[labelText.amountOfTkText, data.chequeAmount], [labelText.printDateText, data.printDate]],
       [[labelText.chargeText, data.charge], [labelText.chequeLostReasonText, data.chequeLostReason]],
       [[labelText.emptyText, labelText.emptyText], [labelText.emptyText, labelText.emptyText]]
    ];
    replaceTableData(tableData);
}
function setChequeStopPaymentRange() {
    addClassText("agentNameLabel", labelText.agentNameText);
    addClassText("agentName", data.agentName);
    addClassText("userIdLabel", labelText.userText);
    addClassText("userId", data.userId);
    addClassText("boothAddressLabel", labelText.addressText);
    addClassText("boothAddress", data.boothAddress);

    addClassText("title", labelText.chequeStopPaymentRangeText);

    addClassText(labelText.accountNoLabelId, labelText.titleId);
    addClassText(labelText.accountNumberId, data.accountNumber);
    addClassText(labelText.accountTypeId, data.savingsAccountType);
    addClassText(labelText.linkAccountNumberColonId, labelText.emptyText);
    addClassText(labelText.linkAccountNumberLabelId, labelText.emptyText);
    addClassText(labelText.linkAccountNumberId, labelText.emptyText);

    addClassText("customerNameLabel", labelText.customerNameText);
    addClassText("customerName", data.customerName);
    addClassText("mobileNoLabel", labelText.mobileNoText);
    addClassText("mobileNo", data.mobileNo);
    addClassText("customerAddressLabel", labelText.addressText);
    addClassText(labelText.customerAddressId, data.customerAddress);

    var tableData = [
       [[labelText.accountNameText, data.accountName], [labelText.requestReceiveTimeText, data.transactionDate]],
       [[labelText.chequeLeafNumberText, data.chequeLeafNumber], [labelText.requestIdText, data.transactionCode]],
       [[labelText.chargeText, data.charge], [labelText.printDateText, data.printDate]],
       [[labelText.emptyText, labelText.emptyText], [labelText.chequeLostReasonText, data.chequeLostReason]],
       [[labelText.emptyText, labelText.emptyText], [labelText.emptyText, labelText.emptyText]]
    ];
    replaceTableData(tableData);
}
function setChequeStopPaymentSingleCancel() {
    addClassText("agentNameLabel", labelText.agentNameText);
    addClassText("agentName", data.agentName);
    addClassText("userIdLabel", labelText.userText);
    addClassText("userId", data.userId);
    addClassText("boothAddressLabel", labelText.addressText);
    addClassText("boothAddress", data.boothAddress);

    addClassText("title", labelText.chequeStopPaymentSingleCancelText);

    addClassText(labelText.accountNoLabelId, labelText.titleId);
    addClassText(labelText.accountNumberId, data.accountNumber);
    addClassText(labelText.accountTypeId, data.savingsAccountType);
    addClassText(labelText.linkAccountNumberColonId, labelText.emptyText);
    addClassText(labelText.linkAccountNumberLabelId, labelText.emptyText);
    addClassText(labelText.linkAccountNumberId, labelText.emptyText);

    addClassText("customerNameLabel", labelText.customerNameText);
    addClassText("customerName", data.customerName);
    addClassText("mobileNoLabel", labelText.mobileNoText);
    addClassText("mobileNo", data.mobileNo);
    addClassText("customerAddressLabel", labelText.addressText);
    addClassText(labelText.customerAddressId, data.customerAddress);

    var tableData = [
       [[labelText.accountNameText, data.accountName], [labelText.receiverNameText, data.receiverName]],
       [[labelText.chequeLeafNumberText, data.chequeLeafNumber], [labelText.requestIdText, data.transactionCode]],
       [[labelText.amountOfTkText, data.chequeAmount], [labelText.printDateText, data.printDate]],
       [[labelText.chargeText, data.charge], [labelText.retrieveFromText, data.retrieveFrom]],
       [[labelText.emptyText, labelText.emptyText], [labelText.emptyText, labelText.emptyText]]
    ];
    replaceTableData(tableData);
}
function setChequeStopPaymentRangeCancel() {
    addClassText("agentNameLabel", labelText.agentNameText);
    addClassText("agentName", data.agentName);
    addClassText("userIdLabel", labelText.userText);
    addClassText("userId", data.userId);
    addClassText("boothAddressLabel", labelText.addressText);
    addClassText("boothAddress", data.boothAddress);

    addClassText("title", labelText.chequeStopPaymentRangeCancelText);

    addClassText(labelText.accountNoLabelId, labelText.titleId);
    addClassText(labelText.accountNumberId, data.accountNumber);
    addClassText(labelText.accountTypeId, data.savingsAccountType);
    addClassText(labelText.linkAccountNumberColonId, labelText.emptyText);
    addClassText(labelText.linkAccountNumberLabelId, labelText.emptyText);
    addClassText(labelText.linkAccountNumberId, labelText.emptyText);

    addClassText("customerNameLabel", labelText.customerNameText);
    addClassText("customerName", data.customerName);
    addClassText("mobileNoLabel", labelText.mobileNoText);
    addClassText("mobileNo", data.mobileNo);
    addClassText("customerAddressLabel", labelText.addressText);
    addClassText(labelText.customerAddressId, data.customerAddress);

    var tableData = [
        [[labelText.accountNameText, data.accountName], [labelText.requestReceiveTimeText, data.transactionDate]],
        [[labelText.chequeLeafNumberText, data.chequeLeafNumber], [labelText.requestIdText, data.transactionCode]],
        [[labelText.chargeText, data.charge], [labelText.printDateText, data.printDate]],
        [[labelText.emptyText, labelText.emptyText], [labelText.retrieveFromText, data.retrieveFrom]],
        [[labelText.emptyText, labelText.emptyText], [labelText.emptyText, labelText.emptyText]]
    ];
    replaceTableData(tableData);
}

function setMiniStatement() {
    addClassText("agentNameLabel", labelText.agentNameText);
    addClassText("agentName", data.agentName);
    addClassText("userIdLabel", labelText.userText);
    addClassText("userId", data.userId);
    addClassText("boothAddressLabel", labelText.addressText);
    addClassText("boothAddress", data.boothAddress);

    addClassText("title", labelText.cityAgentSavingsAccountText);

    addClassText(labelText.accountNoLabelId, labelText.titleId);
    addClassText(labelText.accountNumberId, data.accountNumber);
    addClassText(labelText.accountTypeId, data.savingsAccountType);
    addClassText(labelText.linkAccountNumberColonId, labelText.colonText);
    addClassText(labelText.linkAccountNumberLabelId, labelText.transactionIdText);
    addClassText(labelText.linkAccountNumberId, data.transactionCode);

    addClassText("customerNameLabel", labelText.customerNameText);
    addClassText("customerName", data.customerName);
    addClassText("mobileNoLabel", labelText.mobileNoText);
    addClassText("mobileNo", data.mobileNo);
    addClassText("customerAddressLabel", labelText.addressText);
    addClassText(labelText.customerAddressId, data.customerAddress);

    var tableData = data.statement;

    var fourthTable = document.getElementsByClassName('fourthTable')[0];
    for (var r in tableData) {
        for (var c in tableData[r]) {
            fourthTable.rows[r].cells[c].innerHTML = tableData[r][c];
        }
    }
}
function setRemittanceRequest() {
    addClassText("agentNameLabel", labelText.agentNameTextEnglish);
    addClassText("agentName", data.agentName);
    addClassText("userIdLabel", labelText.userTextEnglish);
    addClassText("userId", data.userId);
    addClassText("boothAddressLabel", labelText.addressTextEnglish);
    addClassText("boothAddress", data.boothAddress);

    addClassText("title", labelText.inwardForeignRemittanceRequestTextEnglish);

    hideElementByClassName('accountBasic');

    addClassText("customerNameLabel", labelText.recipientNameTextEnglish);
    addClassText("customerName", data.customerName);
    addClassText("mobileNoLabel", labelText.mobileNoTextEnglish);
    addClassText("mobileNo", data.mobileNo);
    addClassText("customerAddressLabel", labelText.exchangeHouseNameEnglish);
    addClassText(labelText.customerAddressId, labelText.emptyText);


    var tableData = [
       [[labelText.senderNameTextEnglish, labelText.emptyText], [labelText.senderCountryTextEnglish, labelText.emptyText]],
       [[labelText.pinNoTextEnglish, labelText.emptyText], [labelText.apprxAmountTextEnglish, labelText.emptyText]],
       [[labelText.iDTypeTextEnglish, labelText.emptyText], [labelText.iDNumberTextEnglish, labelText.emptyText]],
       [[labelText.amountInWordsTextEnglish, labelText.emptyText], [labelText.printDateTextEnglish, labelText.emptyText]],
       [[labelText.emptyText, labelText.emptyText], [labelText.emptyText, labelText.emptyText]],
    ];
    replaceTableData(tableData);
}
function setRemittanceWithdraw() {
    addClassText("agentNameLabel", labelText.agentNameTextEnglish);
    addClassText("agentName", data.agentName);
    addClassText("userIdLabel", labelText.userTextEnglish);
    addClassText("userId", data.userId);
    addClassText("boothAddressLabel", labelText.addressTextEnglish);
    addClassText("boothAddress", data.boothAddress);

    addClassText("title", labelText.inwardForeignRemittanceWithdrawTextEnglish);

    hideElementByClassName('accountBasic');

    addClassText("customerNameLabel", labelText.recipientNameTextEnglish);
    addClassText("customerName", data.customerName);
    addClassText("mobileNoLabel", labelText.mobileNoTextEnglish);
    addClassText("mobileNo", data.mobileNo);
    addClassText("customerAddressLabel", labelText.exchangeHouseNameEnglish);
    addClassText(labelText.customerAddressId, labelText.emptyText);


    var tableData = [
       [[labelText.senderNameTextEnglish, labelText.emptyText], [labelText.senderCountryTextEnglish, labelText.emptyText]],
       [[labelText.pinNoTextEnglish, labelText.emptyText], [labelText.payableAmountTextEnglish, labelText.emptyText]],
       [[labelText.transactionIdTextEnglish, labelText.emptyText], [labelText.currencyTextEnglish, labelText.emptyText]],
       [[labelText.exchangeRateTextEnglish, labelText.emptyText], [labelText.fxAmountTextEnglish, labelText.emptyText]],
       [[labelText.amountInWordsTextEnglish, labelText.emptyText], [labelText.printDateTextEnglish, labelText.emptyText]]
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
                fourthTable.rows[i].cells[++j].innerHTML = labelText.colonText;
            } else {
                fourthTable.rows[i].cells[j].innerHTML = labelText.emptyText;
                fourthTable.rows[i].cells[++j].innerHTML = labelText.emptyText;
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
function hideElementByClassName(elementId) {
    var elements = document.getElementsByClassName(elementId);

    if (elements != null) {
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.display = 'none';
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