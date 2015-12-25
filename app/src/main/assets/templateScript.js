window.onload = function () {
    var url = window.location.search;
    url = url.replace("?", ''); // remove the ?
    if (!url) {
        url = receipt;
    }

    addStyleSheet('style_sheet/styles.css');
    addStyleSheet('file:///android_asset/styles.css');
    replaceToken(parseInt(url));
}

var receipts = {
    ACCOUNT_BALANCE: 1,
    CASH_DEPOSIT: 2,
    CASH_WITHDRAW: 3,
    DPS_ACCOUNT: 4,
    FIXED_DEPOSIT: 5,
    FUND_TRANSFER: 6,
    SAVINGS_ACCOUNT: 7
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
var balanceAmountText = "ব্যালান্সের পরিমান";
var balanceDateText = "ব্যালান্সের তারিখ";
var chargeText = "চার্জ";
var cashDepositText = "নগদ জমা";
var cashWithdrawText = "নগদ উত্তোলন";
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

var accountNameValue = "MD Arif Gazi";
var accountNumberValue = "2001158500126";
var balanceAmountValue = "BDT 80,550.00";
var balanceAmountInWordsValue = "EIGHTY THOUSAND FIVE HUNDRED FIFTY ONLY";
var chargeVaue = "BDT 7.50";
var today = new Date();
var currentDate = getDateString(today);
var customerAddressValue = "GREEN GADEN BUILDING, FLAT- D4, HOUSE- 12, ROAD- 10, BLOCK- C, MIRPUR, PS- MIRPUR, DHAKA";
var depositAmountInWordsValue = "THREE THOUSAND ONLY";
var depositAmountValue = "BDT 3,000.00";
var dpsAccountTypeValue = "DPS";
var linkAccountNumberValue = "2005246987526";
var maturityAmountValue = "BDT 2,26,047.00";
var maturityDate = getDateString(new Date(today.getFullYear() + 5, today.getMonth(), today.getDate()));
var principalAmountValue = "BDT 1,00,000.00";
var printDateValue = getTimestampString(new Date());
var productTenorValue = "5 Years";
var profitRateValue = "8.85% (Yearly)";
var receiverAccountNameValue = "SUJON PATWARY";
var termDepositAccountTypeValue = "TERM DEPOSIT";
var savingsAccountTypeValue = "Savings";
var transactionCodeValue = "TR222369";
var withdrawAmountValue = "BDT 3,000.00 + 7.5 (Charge)";
var withdrawsAmountInWordsValue = "THREE THOUSAND SEVEN TAKA FIFTY PAISA ONLY";


var accountNoLabelId = "accountNoLabel";
var accountNumberId = "accountNumber";  //#ACCOUNT_NUMBER
var accountTypeId = "accountType";  //#ACCOUNT_TYPE
var customerAddressId = "customerAddress";
var linkAccountNumberColonId = "linkAccountNumberColon"; //#LINK_ACCOUNT_NUMBER_COLON
var linkAccountNumberLabelId = "linkAccountNumberLabel"; //#LINK_ACCOUNT_NUMBER_LABEL
var linkAccountNumberId = "linkAccountNumber"; //#LINK_ACCOUNT_NUMBER
var titleId = "title";  //#TITLE

var t00LabelId = "t00Label"; //#T_00_LABEL
var t00ValueId = "t00Value"; //#T_00_VALUE
var t01LabelId = "t01Label"; //#T_01_LABEL
var t01ValueId = "t01Value"; //#T_01_VALUE

var t10LabelId = "t10Label"; //#T_10_LABEL
var t10ValueId = "t10Value"; //#T_10_VALUE
var t11LabelId = "t11Label"; //#T_11_LABEL
var t11ValueId = "t11Value"; //#T_11_VALUE

var t20LabelId = "t20Label"; //#T_20_LABEL
var t20ColonId = "t20Colon"; //#COLON
var t20ValueId = "t20Value"; //#T_20_VALUE
var t21LabelId = "t21Label"; //#T_21_LABEL
var t21ColonId = "t21Colon"; //#COLON
var t21ValueId = "t21Value"; //#T_21_VALUE

var t30LabelId = "t30Label"; //#T_30_LABEL
var t30ColonId = "t30Colon"; //#COLON
var t30ValueId = "t30Value"; //#T_30_VALUE
var t31LabelId = "t31Label"; //#T_31_LABEL
var t31ColonId = "t31Colon"; //#COLON
var t31ValueId = "t31Value"; //#T_31_VALUE




function replaceToken(receipt) {
    addImage("agent_banking_logo", "file:///android_asset/AGENT-BANKING-LOGO_Small.png", "images/AGENT-BANKING-LOGO_Small.png");
    addImage("logo", "file:///android_asset/logo.gif", "images/logo.png");
    addImage("qr", "file:///android_asset/qr.png", "images/qr.png");
    addImage("customerPhoto", "file:///android_asset/photo.png", "images/photo.png");

    addClassText("addressLine1Label", addressLine1Text); //#ADDRESS_LINE_1
    addClassText("addressLine2Label", addressLine2Text); //#ADDRESS_LINE_2
    addClassText("addressLine3Label", addressLine3Text); //#ADDRESS_LINE_3
    addClassText("addressLine4Label", addressLine4Text); //#ADDRESS_LINE_4

    addClassText("agentNameLabel", agentNameText); //#AGENT_NAME_LABEL
    addClassText("agentName", "BADRUL ALOM"); //#AGENT_NAME
    addClassText("userIdLabel", userText); //#USER_ID_LABEL
    addClassText("userId", "615001001 (NAIM ISLAM)"); //#USER_ID
    addClassText("addressLabel", addressText); //#ADDRESS_LABEL
    addClassText("boothAddress", "VAIRAB BAZAR, CHOWDHURYR HAT, SONAGAZI"); //#BOOTH_ADDRESS
    addClassText("customerIdLabel", customerIdText); //#CUSTOMER_ID_LABEL,
    addClassText("customerId", "CB1158500"); //#CUSTOMER_ID, ID will be 7 characters
    addClassText("accountTypeLabel", accountTypeText); //#ACCOUNT_TYPE_LABEL
    addClassText("customerNameLabel", customerNameText); //#CUSTOMER_NAME_LABEL
    addClassText("customerName", "MD Arif Gazi"); //#CUSTOMER_NAME
    addClassText("mobileNoLabel", mobileNoText); //#MOBILE_NO_LABEL
    addClassText("mobileNo", "01617877595"); //#MOBILE_NO


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
        default:
            break;
    }
}
function setAccountBalance() {
    addClassText(titleId, accountBalanceText);

    addClassText(accountNoLabelId, accountNoText);
    addClassText(accountNumberId, accountNumberValue);
    addClassText(accountTypeId, savingsAccountTypeValue);
    addClassText(linkAccountNumberColonId, emptyText);
    addClassText(linkAccountNumberLabelId, emptyText);
    addClassText(linkAccountNumberId, emptyText);

    addClassText(customerAddressId, customerAddressValue);

    addClassText(t00LabelId, accountNameText);
    addClassText(t00ValueId, accountNameValue);
    addClassText(t01LabelId, balanceDateText);
    addClassText(t01ValueId, currentDate);

    addClassText(t10LabelId, balanceAmountText);
    addClassText(t10ValueId, balanceAmountValue);
    addClassText(t11LabelId, transactionIdText);
    addClassText(t11ValueId, transactionCodeValue);

    addClassText(t20LabelId, inWordsText);
    addClassText(t20ColonId, colonText);
    addClassText(t20ValueId, balanceAmountInWordsValue);
    addClassText(t21LabelId, printDateText);
    addClassText(t21ColonId, colonText);
    addClassText(t21ValueId, printDateValue);

    addClassText(t30LabelId, emptyText);
    addClassText(t30ColonId, emptyText);
    addClassText(t30ValueId, emptyText);
    addClassText(t31LabelId, emptyText);
    addClassText(t31ColonId, emptyText);
    addClassText(t31ValueId, emptyText);
}
function setCashDeposit() {
    addClassText("title", cashDepositText); //#TITLE

    addClassText(accountNoLabelId, accountNoText);
    addClassText(accountNumberId, accountNumberValue);
    addClassText(accountTypeId, savingsAccountTypeValue);
    addClassText(linkAccountNumberColonId, emptyText);
    addClassText(linkAccountNumberLabelId, emptyText);
    addClassText(linkAccountNumberId, emptyText);

    addClassText(customerAddressId, customerAddressValue);

    addClassText(t00LabelId, accountNameText);
    addClassText(t00ValueId, accountNameValue);
    addClassText(t01LabelId, depositDateText);
    addClassText(t01ValueId, currentDate);

    addClassText(t10LabelId, depositAmountText);
    addClassText(t10ValueId, depositAmountValue);
    addClassText(t11LabelId, transactionIdText);
    addClassText(t11ValueId, transactionCodeValue);

    addClassText(t20LabelId, inWordsText);
    addClassText(t20ColonId, colonText);
    addClassText(t20ValueId, depositAmountInWordsValue);
    addClassText(t21LabelId, printDateText);
    addClassText(t21ColonId, colonText);
    addClassText(t21ValueId, printDateValue);

    addClassText(t30LabelId, emptyText);
    addClassText(t30ColonId, emptyText);
    addClassText(t30ValueId, emptyText);
    addClassText(t31LabelId, emptyText);
    addClassText(t31ColonId, emptyText);
    addClassText(t31ValueId, emptyText);
}
function setCashWithdraw() {
    addClassText("title", cashWithdrawText); //#TITLE

    addClassText(accountNoLabelId, accountNoText);
    addClassText(accountNumberId, accountNumberValue);
    addClassText(accountTypeId, savingsAccountTypeValue);
    addClassText(linkAccountNumberColonId, emptyText);
    addClassText(linkAccountNumberLabelId, emptyText);
    addClassText(linkAccountNumberId, emptyText);

    addClassText(customerAddressId, customerAddressValue);

    addClassText(t00LabelId, accountNameText);
    addClassText(t00ValueId, accountNameValue);
    addClassText(t01LabelId, withdrawDateText);
    addClassText(t01ValueId, currentDate);

    addClassText(t10LabelId, withdrawAmountText);
    addClassText(t10ValueId, depositAmountValue);
    addClassText(t11LabelId, transactionIdText);
    addClassText(t11ValueId, transactionCodeValue);

    addClassText(t20LabelId, inWordsText);
    addClassText(t20ColonId, colonText);
    addClassText(t20ValueId, depositAmountInWordsValue);
    addClassText(t21LabelId, printDateText);
    addClassText(t21ColonId, colonText);
    addClassText(t21ValueId, printDateValue);

    addClassText(t30LabelId, chargeText);
    addClassText(t30ColonId, colonText);
    addClassText(t30ValueId, chargeVaue);
    addClassText(t31LabelId, emptyText);
    addClassText(t31ColonId, emptyText);
    addClassText(t31ValueId, emptyText);
}
function setDPSAccount() {
    addClassText("title", generalDPSAccountText); //#TITLE

    addClassText(accountNoLabelId, accountNoText);
    addClassText(accountNumberId, emptyText);
    addClassText(accountTypeId, dpsAccountTypeValue);
    addClassText(linkAccountNumberLabelId, linkAccountNumberText);
    addClassText(linkAccountNumberColonId, colonText);
    addClassText(linkAccountNumberId, linkAccountNumberValue);

    addClassText(customerAddressId, customerAddressValue);

    addClassText(t00LabelId, accountNameText);
    addClassText(t00ValueId, accountNameValue);
    addClassText(t01LabelId, productTenorText);
    addClassText(t01ValueId, productTenorValue);

    addClassText(t10LabelId, accountOpeningDateText);
    addClassText(t10ValueId, currentDate);
    addClassText(t11LabelId, maturityDateText);
    addClassText(t11ValueId, maturityDate);

    addClassText(t20LabelId, monthlyDepositText);
    addClassText(t20ColonId, colonText);
    addClassText(t20ValueId, depositAmountValue);
    addClassText(t21LabelId, printDateText);
    addClassText(t21ColonId, colonText);
    addClassText(t21ValueId, printDateValue);

    addClassText(t30LabelId, maturityAmountText);
    addClassText(t30ColonId, colonText);
    addClassText(t30ValueId, maturityAmountValue);
    addClassText(t31LabelId, emptyText);
    addClassText(t31ColonId, emptyText);
    addClassText(t31ValueId, emptyText);
}
function setFixedDeposit() {
    addClassText("title", cityAgentFixedDepositText); //#TITLE

    addClassText(accountNoLabelId, accountNoText);
    addClassText(accountNumberId, emptyText);
    addClassText(accountTypeId, termDepositAccountTypeValue);
    addClassText(linkAccountNumberLabelId, linkAccountNumberText);
    addClassText(linkAccountNumberColonId, colonText);
    addClassText(linkAccountNumberId, linkAccountNumberValue);

    addClassText(customerAddressId, customerAddressValue);

    addClassText(t00LabelId, accountNameText);
    addClassText(t00ValueId, accountNameValue);
    addClassText(t01LabelId, productTenorText);
    addClassText(t01ValueId, productTenorValue);

    addClassText(t10LabelId, accountOpeningDateText);
    addClassText(t10ValueId, currentDate);
    addClassText(t11LabelId, maturityDateText);
    addClassText(t11ValueId, maturityDate);

    addClassText(t20LabelId, profitRateText);
    addClassText(t20ColonId, colonText);
    addClassText(t20ValueId, profitRateValue);
    addClassText(t21LabelId, maturityAmountText);
    addClassText(t21ColonId, colonText);
    addClassText(t21ValueId, maturityAmountValue);

    addClassText(t30LabelId, principalAmountText);
    addClassText(t30ColonId, colonText);
    addClassText(t30ValueId, principalAmountValue);
    addClassText(t31LabelId, printDateText);
    addClassText(t31ColonId, colonText);
    addClassText(t31ValueId, printDateValue);
}
function setFundTransfer() {
    addClassText("title", fundTransferText); //#TITLE

    addClassText(accountNoLabelId, senderAccountNoText);
    addClassText(accountNumberId, accountNumberValue);
    addClassText(accountNumberId, accountNumberValue);
    addClassText(accountTypeId, savingsAccountTypeValue);
    addClassText(linkAccountNumberLabelId, emptyText);
    addClassText(linkAccountNumberColonId, emptyText);
    addClassText(linkAccountNumberId, emptyText);

    addClassText(customerAddressId, customerAddressValue);

    addClassText(t00LabelId, sendrAccountNameText);
    addClassText(t00ValueId, accountNameValue);
    addClassText(t01LabelId, fundTransferDateText);
    addClassText(t01ValueId, currentDate);

    addClassText(t10LabelId, receiverAccountNameText);
    addClassText(t10ValueId, receiverAccountNameValue);
    addClassText(t11LabelId, receiverAccountNoText);
    addClassText(t11ValueId, linkAccountNumberValue);

    addClassText(t20LabelId, transferAmountText);
    addClassText(t20ColonId, colonText);
    addClassText(t20ValueId, depositAmountValue);
    addClassText(t21LabelId, transactionIdText);
    addClassText(t21ColonId, colonText);
    addClassText(t21ValueId, transactionCodeValue);

    addClassText(t30LabelId, inWordsText);
    addClassText(t30ColonId, colonText);
    addClassText(t30ValueId, depositAmountInWordsValue);
    addClassText(t31LabelId, printDateText);
    addClassText(t31ColonId, colonText);
    addClassText(t31ValueId, printDateValue);
}
function setSavingsAccount() {
    addClassText("title", cityAgentSavingsAccountText); //#TITLE

    addClassText(accountNoLabelId, accountNoText);
    addClassText(accountNumberId, accountNumberValue);
    addClassText(accountTypeId, savingsAccountTypeValue);
    addClassText(linkAccountNumberColonId, emptyText);
    addClassText(linkAccountNumberLabelId, emptyText);
    addClassText(linkAccountNumberId, emptyText);

    addClassText(customerAddressId, emptyText);

    addClassText(t00LabelId, accountNameText);
    addClassText(t00ValueId, accountNameValue);
    addClassText(t01LabelId, initialDepositText);
    addClassText(t01ValueId, depositAmountValue);

    addClassText(t10LabelId, accountOpeningDateText);
    addClassText(t10ValueId, currentDate);
    addClassText(t11LabelId, printDateText);
    addClassText(t11ValueId, printDateValue);

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
}
function getDateString(date) {

    var monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
    ];

    var yyyy = date.getFullYear().toString();
    var mm = (date.getMonth().toLocaleString()).toString(); // getMonth() is zero-based
    var dd = date.getDate().toString();
    return ((dd[1] ? dd : "0" + dd[0]) + '-' + monthNames[mm] + '-' + yyyy); // padding
};
function getTimestampString(date) {

    var monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
    ];

    var yyyy = date.getFullYear().toString();
    var mm = (date.getMonth().toLocaleString()).toString(); // getMonth() is zero-based
    var dd = date.getDate().toString();
    var hh = date.getHours().toString();
    var min = date.getMinutes().toString();
    var sec = date.getSeconds().toString();
    return ((dd[1] ? dd : "0" + dd[0]) + '-' + monthNames[mm] + '-' + yyyy + ' ' + hh + ':' + min + ':' + sec + ' ' + ((hh >= 12) ? "PM" : "AM"));
};
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