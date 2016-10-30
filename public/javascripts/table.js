var filtersConfig = {
  base_path: '',
  //col_0: 'checklist',
  col_1: 'select',
  col_2: 'select',
  col_3: 'select',
  alternate_rows: true,
  rows_counter: true,
  btn_reset: true,
  loader: true,
  mark_active_columns: true,
  highlight_keywords: true,
  no_results_message: true,
  col_types: [
    'Number', 'Number', 'Number',
    'Number', 'Number', 'Number'
  ],
  custom_options: {
    cols: [3],
    texts: [
      [
        '30 - 33',
        '30 - 36',
        '30 - 39'

      ]
    ],
    values: [
      [
        '>30 && <=33',
        '>30 && <=36',
        '>30 && <=39'
      ]
    ],
    sorts: [false]
  },
  col_widths: [
    '150px', '150px', '150px',
    '150px', '150px', '150px'
  ],
  extensions: [{
    name: 'sort',
    async_sort: true,
    images_path: 'https://koalyptus.github.io/TableFilter/tablefilter/style/themes/'
  }]
};

var tf = new TableFilter('demo', filtersConfig);
tf.init();
