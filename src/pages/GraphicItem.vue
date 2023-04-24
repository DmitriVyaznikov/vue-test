<template>
  <div class="container">
    <pre>{{chartData}}</pre>
    <LineChart v-if="loaded" :data="chartData" />
  </div>
</template>

<script>
import { Line as LineChart } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  PointElement,
  LineElement,
  LinearScale,
);

import { useItemStore } from '../store/index';

export default {
  components: { LineChart },
  data: () => ({
    loaded: false,
    chartData: null,
  }),
  methods: {
    middleValue(array) {
      return +Number(array.reduce((total, price) => total + price, 0) / array.length)
    }
  },
  async mounted() {
    this.loaded = false;

    try {
      const store = useItemStore();
      await store.fetchItems();
      const items = store.posts;

      const chartData = items.reduce((acc, item) => {
        const objYear = acc[item.year]
        if(!objYear) {
          acc[item.year] = { year: item.year, prices: [item.price] }
        } else {
          objYear.prices.push(item.price)
        }
        return acc
      }, {});

      let itemsArray = Object.values(chartData).map((item) => ({
        year: item.year,
        averagePrice: this.middleValue(item.prices).toFixed(2)
      }))

      this.chartData = {
        labels: Object.keys(chartData),
        datasets: [
          {
            label: 'Средняя цена всех товаров за год',
            backgroundColor: '#f87979',
            data: itemsArray.map((item) => item.averagePrice),
          },
        ],
      };
      this.loaded = true;
    } catch (e) {
      console.error(e);
    }
  },
};
</script>

<style scoped></style>
