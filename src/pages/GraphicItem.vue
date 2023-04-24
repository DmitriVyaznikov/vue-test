<template>
  <div class="container">
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
  async mounted() {
    this.loaded = false;

    try {
      const store = useItemStore();
      await store.fetchItems();
      const items = store.posts;

      const chartData = items.reduce((result, item) => {
        const yearIndex = result.findIndex((obj) => obj.year === item.year);
        if (yearIndex === -1) {
          result.push({ year: item.year, prices: [item.price] });
        } else {
          result[yearIndex].prices.push(item.price);
        }
        return result;
      }, []);

      chartData.forEach((item) => {
        const sum = item.prices.reduce((total, price) => total + price, 0);
        item.averagePrice = sum / item.prices.length;
        delete item.prices;
      });

      this.chartData = {
        labels: [...chartData.map((item) => item.year)].sort((a, b) => a - b),
        datasets: [
          {
            label: 'Средняя цена всех товаров за год',
            backgroundColor: '#f87979',
            data: chartData.map((item) => item.averagePrice),
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
