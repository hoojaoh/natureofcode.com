(function() {
  var calculateBreakdown, cleanDollarInput, defaultPrice, dollarToSliderPos, sliderPosToDollar, updateAmountFromInput, updateAmountFromSlider, updatePercentFromInput, updatePercentFromSlider;

  defaultPrice = 10.00;

  dollarToSliderPos = function(dollar) {
    return dollar * 4;
  };

  sliderPosToDollar = function(sliderPos) {
    return sliderPos * .25;
  };

  calculateBreakdown = function() {
    var donationDollars, donationPercent, totalAmount;
    totalAmount = parseFloat($('#amount').val());
    donationPercent = (parseFloat($('#percent').val())) / 100.0;
    donationDollars = totalAmount * donationPercent;
    $('#author-dollars').text("$" + ((totalAmount - donationDollars).toFixed(2)));
    return $('#donation-dollars').text("$" + (donationDollars.toFixed(2)));
  };

  cleanDollarInput = function(dollarInput) {
    var dollarFloat, noDollar;
    noDollar = dollarInput.replace('$', '');
    dollarFloat = parseFloat(noDollar).toFixed(2) || defaultPrice;
    if (dollarFloat < 0) {
      return defaultPrice.toFixed(2);
    } else {
      return dollarFloat;
    }
  };

  updateAmountFromSlider = function(sliderPos) {
    var sliderAmount;
    sliderAmount = sliderPosToDollar(sliderPos).toFixed(2);
    $('#display-amount').val("$" + sliderAmount);
    $('#amount').val(sliderAmount);
    calculateBreakdown();
    return this;
  };

  updateAmountFromInput = function() {
    var newAmount, raw;
    raw = $('#display-amount').val() || defaultPrice;
    newAmount = cleanDollarInput(raw);
    $('#amount').val(newAmount);
    $('#slider').slider('value', dollarToSliderPos(newAmount));
    $(this).val('$' + newAmount);
    calculateBreakdown();
    return this;
  };

  updatePercentFromInput = function(percentString) {
    var percent;
    percent = parseInt(percentString.replace('%', '')) || 5;
    if (percent < 0) {
      percent = 0;
    } else if (percent > 100) {
      percent = 100;
    }
    $('#percent-slider').slider('value', percent);
    $('#percent').val(percent);
    $('#display-percent').val(percent + '%');
    calculateBreakdown();
    return false;
  };

  updatePercentFromSlider = function(sliderPos) {
    $('#percent').val(sliderPos);
    $('#display-percent').val(sliderPos + '%');
    calculateBreakdown();
    return this;
  };

  jQuery(function() {
    $('.eml').html("<a href='ma" + "il" + "to:dan" + "iel" + "@" + "shiffman.net'>daniel" + "@shi" + "ffman" + ".net</a>");
    $('#display-percent').blur(function() {
      var raw;
      raw = $(this).val() || 5;
      updatePercentFromInput(raw);
      return false;
    });
    $('#display-percent').change(function() {
      var raw;
      raw = $(this).val() || 5;
      updatePercentFromInput(raw);
      return false;
    });
    $('#display-amount').blur(function() {
      updateAmountFromInput();
      return false;
    });
    $('#display-amount').change(function() {
      updateAmountFromInput();
      return false;
    });
    $('#percent-slider').slider({
      value: 5,
      animate: true,
      slide: function(e, ui) {
        return updatePercentFromSlider(ui.value);
      },
      stop: function(e, ui) {
        return updatePercentFromSlider(ui.value);
      }
    });

    $('#slider').slider({
      value: dollarToSliderPos(defaultPrice),
      animate: true,
      create: function() {
        return updateAmountFromSlider(dollarToSliderPos(defaultPrice));
      },
      slide: function(e, ui) {
        return updateAmountFromSlider(ui.value);
      },
      stop: function(e, ui) {
        return updateAmountFromSlider(ui.value);
      }
    });
  });

}).call(this);
