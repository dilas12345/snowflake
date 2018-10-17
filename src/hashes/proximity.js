function numSplit(numText) {
    var str = numText.toString();
    var l = str.length;
    var numClear = "";
    if ( l === 10 ){
        numClear = str.substr(0,1) + " " + str.substr(1,3) + " ";
        numClear += str.substr(4,3) + " " + str.substr(7,3) + " ";
    } else if ( l === 11 ){
        numClear = str.substr(0,1) + " " + str.substr(1,3) + " ";
        numClear += str.substr(4,3) + " " + str.substr(7,3) + " ";
        numClear += str.substr(10,1);
    }
    return numClear;
}

function ICAODate(ISOformat) {
    var str = ISOformat.toString();
    return str.substr(2, 2 ) + str.substr( 5, 2 ) + str.substr(8,2);
}

function bundleDigest(inflow) {
    // Use this to perform doubleSHA and RIPEMD160!
    let shaObj = new jsSHA("SHA-256", "TEXT");
    let shaObj2 = new jsSHA("SHA-256", "TEXT");
    shaObj.update(inflow);
    let s1 = shaObj.getHash("HEX");
    shaObj2.update(s1);
    let s2 = shaObj2.getHash("HEX");
    return hex_rmd160(s2);
}

function mkMRZ() {
    // <!--- BEGIN ICAO DATA -->
    let fn = $.totalStorage("firstname");
    let mn = $.totalStorage("middlename");
    let sn = $.totalStorage("surname");
    let nin = $.totalStorage("nin");
    let dob = $.totalStorage("dob");
    const userID  = $.totalStorage("userid");
    const idNumber  = $.totalStorage("idnumber");
    const gender = $.totalStorage("gender");
    const expiry = $.totalStorage("expiry");
    let nationality = $.totalStorage("nationality");
    nationality = "NGA";
    let country = nationality;

    let dob2 = ICAODate(dob);
    let exp2 = ICAODate(expiry);

    // <-- END ICAO DATA -->

    let M1 = "I<NGA";
    let M2 = "";
    let M3 = "";

    let checkSum  = ICAOChecksum(idNumber);
    let idN = idNumber.toString();
    let dataBlock = [ country, idNumber, nin, dob2, gender, exp2, nationality, sn, fn, mn ];

    M1 += idN + checkSum;

    let position  = 0;
    let blankMRZ = "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<";

    /* Add Personal Number (no checksum) */
    let nx = dataBlock[2].toString();
    position = M1.length + nx.length;
    M1 += nx + blankMRZ.substr( position, ( 30 - position ) );

    // Second Line ...
    let dB = ICAOChecksum( dataBlock[3] );
    let dB2 = ICAOChecksum( dataBlock[5] );

    M2 = dataBlock[3] + dB + dataBlock[4] + dataBlock[5] + dB2;
    M2 += dataBlock[6];

    /* Compute the Composite Checksum, based on ICAO Doc 9303 part 5 */
    let line2 = M1.substr(5) + M2.substr( 0, 7 ) + M2.substr( 8, 7 ) + M2.substr( 18, 11 );
    let composite = ICAOChecksum(line2);
    position  = M2.length;
    M2 += blankMRZ.substr( position, ( 29 - position ) ) + composite;

    // Third Line ...
    /* Replace any hyphen with <
       ICAO 9303 p3, p.19 */
    let SName = dataBlock[7].toUpperCase();
    let SName2 = SName.replace('-','<');

    let FName = dataBlock[8].toUpperCase();
    let FName2 = FName.replace('-','<');

    let MName = dataBlock[9].toUpperCase();
    let MName2 = MName.replace('-','<');

    M3 = SName2.substr( 0, 10 ) + "<<" + FName2 + "<" + MName2;
    position = M3.length;
    M3 += blankMRZ.substr( position, ( 30 - position ) );

    let mData = M1 + M2 + M3;
    let mHash = bundleDigest(mData);

    $.totalStorage("MRZ1", M1);
    $.totalStorage("MRZ2", M2);
    $.totalStorage("MRZ3", M3);
    $.totalStorage("mhash", mHash);
}

function writeToStorage() {
    
}

function ICAOChecksum(myCode) {
    let str = myCode.toString();
    let chars = str.split("");
    let l = str.length;
    let sampler = 0;
    let tap = [];
    let digit = [];
    let threeCount = 0;
    let Dx = 0;
    let ord = 0;

    tap[0] = "7";
    tap[1] = "3";
    tap[2] = "1";

    for ( i = 0; i < l; i++ ){
        sampler = str.substr(i,1);
        ord = sampler.charCodeAt();
        ord = (ord > 64) ? (ord - 55) : (ord - 48);
        digit[i] = ord * tap[threeCount];
        if ( threeCount >= 2 ) {
            threeCount = 0;
        } else {
            threeCount++;
        }
        Dx += digit[i];
    }
    return (Dx % 10);
}

function checkMobile() {
    var mobile = $('#mobile').val().trim();
    var dataString = "mo=" + mobile;

    $.ajax({
        type: "POST",
        url: "scripts/PERL/check_mobile.pl",
        dataType: "json",
        data: dataString,
        success: function (data) {
            if (data.success){
                // Got a result
                $.totalStorage("mobile", mobile);
                $('#mobileresult').show().removeClass('invalid').addClass('valid').html(data.success).fadeOut(10000);
            } else {
                $('#mobileresult').show().removeClass('valid').addClass('invalid').html(data.error);
            }
        },
        error: function(jqXHR, textStatus, error){
            console.log(error);
        }
    });
}

function checkEmail() {

    var email = $('#email').val();
    var dataString = "email=" + email;

    $.ajax({
        type: "POST",
        url: "scripts/PERL/check_email.pl",
        dataType: "json",
        data: dataString,
        success: function (data) {
            if (data.success){
                // Got a result
                $('#emailresult').show().removeClass('invalid').addClass('valid').html(data.success).fadeOut(10000);
                $.totalStorage("email", email);
            } else {
                $('#emailresult').show().removeClass('valid').addClass('invalid').html(data.error);
            }
        }
    });
}

function toggleFullScreen() {
    var doc = window.document;
    var docEl = doc.documentElement;

    var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
    var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

    if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
        requestFullScreen.call(docEl);
    }
    else {
        cancelFullScreen.call(doc);
    }
}


