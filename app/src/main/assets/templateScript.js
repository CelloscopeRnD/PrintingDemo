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



var data = {
    "accountName": "MD Arif Gazi",
    "accountNumber": "2001158500126",
    "agentName": "BADRUL ALOM",
    "balanceAmount": "BDT 80,550.00",
    "balanceAmountInWords": "EIGHTY THOUSAND FIVE HUNDRED FIFTY ONLY",
    "boothAddress": "VAIRAB BAZAR, CHOWDHURYR HAT, SONAGAZI",
    "charge": "BDT 7.50",
    "customerAddress": "GREEN GADEN BUILDING, FLAT- D4, HOUSE- 12, ROAD- 10, BLOCK- C, MIRPUR, PS- MIRPUR, DHAKA",
    "customerId": "CB1158500",
    "customerName": "Md. Arif Gazi",
    "depositAmountInWords": "THREE THOUSAND ONLY",
    "depositAmount": "BDT 3,000.00",
    "dpsAccountType": "DPS",
    "linkAccountNumber": "2005246987526",
    "maturityAmount": "BDT 2,26,047.00",
    "maturityDate": "19-JAN-2021",
    "mobileNo": "01617877595",
    "principalAmount": "BDT 1,00,000.00",
    "printDate": "19-JAN-2016 13:13:15 PM",
    "productTenor": "5 Years",
    "profitRate": "8.85% (Yearly)",
    "receiverAccountName": "SUJON PATWARY",
    "termDepositAccountType": "TERM DEPOSIT",
    "transactionDate": "19-JAN-2016",
    "savingsAccountType": "Savings",
    "transactionCode": "TR222369",
    "userId": "615001001 (NAIM ISLAM)",
    "withdrawAmount": "BDT 3,000.00 + 7.5 (Charge)",
    "withdrawsAmountInWords": "THREE THOUSAND SEVEN TAKA FIFTY PAISA ONLY",
};



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
    addClassText(t10ValueId, data.depositAmount);
    addClassText(t11LabelId, transactionIdText);
    addClassText(t11ValueId, data.transactionCode);

    addClassText(t20LabelId, inWordsText);
    addClassText(t20ColonId, colonText);
    addClassText(t20ValueId, data.depositAmountInWords);
    addClassText(t21LabelId, printDateText);
    addClassText(t21ColonId, colonText);
    addClassText(t21ValueId, data.printDate);

    addClassText(t30LabelId, chargeText);
    addClassText(t30ColonId, colonText);
    addClassText(t30ValueId, data.charge);
    addClassText(t31LabelId, emptyText);
    addClassText(t31ColonId, emptyText);
    addClassText(t31ValueId, emptyText);
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