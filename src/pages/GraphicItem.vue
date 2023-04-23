<!-- <template>
  <div>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import { onMounted, ref, watch } from 'vue';
import Chart from 'chart.js/auto';
import { useItemStore } from '@/store/index';

export default {
  setup() {
    const itemStore = useItemStore();

    const chart = ref(null);
    const chartCanvas = ref(null);

    const drawChart = () => {
      const ctx = chartCanvas?.value?.getContext('2d');
      chart.value = new Chart(ctx, {
        type: 'line',
        data: {
          labels: itemStore?.posts?.map((item) => item.year),
          datasets: [
            {
              label: 'Цена',
              data: itemStore?.posts?.map((item) => item.price),
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    };

    const updateChart = () => {
      if (chart.value) {
        chart.value.data.labels = itemStore?.posts?.map((item) => item.year);
        chart.value.data.datasets[0].data = itemStore?.posts.map(
          (item) => item.price,
        );
        chart.value.update();
      }
    };

    onMounted(() => {
      itemStore.fetchItems();
      drawChart();
    });

    watch(
      () => itemStore.posts,
      () => {
        updateChart();
      },
    );

    const destroyChart = () => {
      if (chart.value) {
        chart.value.destroy();
      }
    };

    return {
      chartCanvas,
      destroyChart,
    };
  },
};
</script> -->
<!-- 
<template>
  <div>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>
<script>
import { onMounted, ref, watch, computed, watchEffect } from 'vue';
import Chart from 'chart.js/auto';
import { useItemStore } from '@/store/index';

export default {
  setup() {
    const itemStore = useItemStore();

    const chart = ref(null);
    const chartCanvas = ref(null);

    const drawChart = () => {
      const ctx = chartCanvas?.value?.getContext('2d');
      chart.value = new Chart(ctx, {
        type: 'line',
        data: {
          labels: [],
          datasets: [
            {
              label: 'Средняя цена',
              data: [],
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    };

    const updateChart = () => {
      if (chart.value) {
        const pricesByYear = itemStore?.posts?.reduce((acc, item) => {
          if (!acc[item.year]) {
            acc[item.year] = {
              prices: [],
              totalPrice: 0,
              count: 0,
            };
          }
          acc[item.year].prices.push(item.price);
          acc[item.year].totalPrice += item.price;
          acc[item.year].count += 1;
          return acc;
        }, {});
        console.log('pricesByYear: ', pricesByYear);

        const labels = Object.keys(pricesByYear);
        const data = labels.map((year) => {
          return pricesByYear[year].totalPrice / pricesByYear[year].count;
        });

        chart.value.data.labels = labels;
        chart.value.data.datasets[0].data = data;
        chart.value.update();
      }
    };

    onMounted(() => {
      itemStore.fetchItems();
      drawChart();
    });

    let prevPosts = null;
    watch(
      () => itemStore?.posts,
      (newPosts) => {
        if (newPosts !== prevPosts) {
          updateChart();
          prevPosts = newPosts;
        }
      },
    );

    const destroyChart = () => {
      if (chart.value) {
        chart?.value?.destroy();
      }
    };

    return {
      chartCanvas,
      destroyChart,
    };
  },
};
</script> -->

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
        labels: chartData.map((item) => item.year),
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
