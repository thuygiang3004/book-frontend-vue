<template>
  <div ref="chartContainer"></div>
</template>

<script setup>
import {onMounted, ref, watch} from 'vue';
import Highcharts from 'highcharts';

// Props
const props = defineProps({
  chartData: {
    type: Array,
    required: true
  }
});

// Refs
const chartContainer = ref('');

// Methods
const renderChart = () => {
  if (chartContainer.value) {
    Highcharts.chart(chartContainer.value, {
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Egg Yolk Composition'
      },
      tooltip: {
        valueSuffix: '%'
      },
      subtitle: {
        text:
            'Source:<a href="https://www.mdpi.com/2072-6643/11/3/684/htm" target="_default">MDPI</a>'
      },
      plotOptions: {
        series: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: [
            {
              enabled: true,
              distance: -50,
              format: '{point.name} {point.percentage:.1f}%',
              filter: {
                operator: '>',
                property: 'percentage',
                value: 10
              }
            },
            {
              enabled: true,
              distance: 20,
              format: '{point.name}',
              filter: {
                operator: '<',
                property: 'percentage',
                value: 10
              }
            },
            {
              enabled: true,
              distance: -50,
              format: '{point.percentage:.1f}%',
              filter: {
                operator: '<',
                property: 'percentage',
                value: 10
              }
            }
          ]
        }
      },
      series: [
        {
          name: 'Percentage',
          colorByPoint: true,
          data: [
            {
              name: 'Water',
              y: 55.02
            },
            {
              name: 'Fat',
              sliced: true,
              selected: true,
              y: 26.71
            },
            {
              name: 'Carbohydrates',
              y: 10.09
            },
            {
              name: 'Protein',
              y: 15.5
            },
            {
              name: 'Ash',
              y: 10.68
            }
          ]
        }
      ]
    });
  }
};

// Lifecycle hooks
onMounted(renderChart);
watch(() => props.chartData, renderChart);
</script>
