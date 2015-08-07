(function ($) {

  Drupal.behaviors.calculate_utilization = {
    attach: function (context, settings) {

      var totalSum = 0;  // holds sum of all table
      var totalUtilRate = 0; // holds utilization rate for all fields
      var totalFields = 0; // total number of fields
      var totalEquipRun = 0; // total number of equipment items

      // iterate through each table
      $(".views-table").each(function(index) {
        var table = $(this); // table currently being looped
        var sum = 0; // holds sum of current table fields
        var equipRun = []; // number of fields per table
        var utilRate = 0; // util rate for each table


        // get length of all the income rows per table
        var count = table.find('td.views-field-field-income').length;

        totalFields += count;

        // iterate through each income td and sum up for each table
        table.find('tr.Running > td.views-field-field-income')
            .each(function (index) {

              // value for each field and parse float
              equipRun[index] = parseFloat($(this).text());

              //add only if the value is number
              if (!isNaN(equipRun[index]) && equipRun[index].length != 0) {

                // sum the values
                sum += equipRun[index];

                // calculate utilization rate
                utilRate = (equipRun.length / count) * 100;
              }
            }); // end td loop

        // sum all table rows
        totalSum += sum;
        totalEquipRun += equipRun.length;
        // sum total utilization rate all tables
        totalUtilRate = (totalEquipRun / totalFields) * 100;

         // add new table row with summed values and utilization rate
        table.children('caption').append('<div><div style="font-size: 16px; padding-right: 15px;"><span style="background-color: #ffffff;">' +
        '<div class="pull-right""><span style="color: #ffffff;">Total: ' +
          '</span><span style="color: #00B500;">$ ' + sum.toFixed(2) + '</span></div>' +
        '<div class="pull-right"><span style="color: #ffffff;">Util. Rate: ' +
          '</span><span style="color: #00B500; padding-right: 10px;">' + utilRate.toFixed(1) + '%</span></div>' +
        '</span></div>' +
        '</div>');

      }); // end table loop

      // total of all fields at top of tables page
      $('fieldset#edit-select > .panel-body > button')
          .after('<div style="float: right;">' +
          '<div class="well" style="background-color: #ffffff"><div><strong>Running Equip Total: <span style="color: red;">$ ' +
          totalSum.toFixed(2) + '</span></div>' + '&nbsp&nbsp&nbsp' +
          '<div>Utilization Rate: ' + '<span style="color: red;">' + totalUtilRate.toFixed(1) + '%</span></strong></div></div>' +
          '</div>');
    }
  }

})(jQuery);