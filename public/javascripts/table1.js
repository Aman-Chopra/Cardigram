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
        '70 - 75',
        '75 - 80',
        '80 - 85'
      ]
    ],
    values: [
      [
        '>70 && <=75',
        '>75 && <=80',
        '>75 && <=80'
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

var tf = new TableFilter('demo1', filtersConfig);
tf.init();
