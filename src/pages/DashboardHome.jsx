import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Button,
  ButtonGroup,
  Avatar,
  Divider,
  MenuItem,
  Select,
  FormControl,
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import EarningIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import OrderIcon from '@mui/icons-material/ShoppingBagOutlined';
import StoreIcon from '@mui/icons-material/StorefrontOutlined';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const DashboardHome = () => {
  const [timeRange, setTimeRange] = useState('Month');
  const [growthPeriod, setGrowthPeriod] = useState('Today');

  const growthChartOptions = {
    chart: {
      type: 'bar',
      height: 320,
      width: '100%',
      stacked: true,
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
          plotOptions: {
            bar: { columnWidth: '60%' },
          },
          xaxis: {
            labels: {
              rotate: -45,
              style: { fontSize: '9px' },
            },
          },
          legend: { position: 'bottom', fontSize: '11px' },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '35%',
        borderRadius: 4,
      },
    },
    colors: ['#90CAF9', '#2196F3', '#673AB7', '#EDE7F6'],
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    fill: { opacity: 1 },
    dataLabels: { enabled: false },
    grid: { borderColor: '#F1F5F9' },
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
      markers: { radius: 12 },
    },
  };

  const growthChartSeries = [
    { name: 'Investment', data: [35, 125, 35, 35, 35, 80, 35, 20, 35, 45, 15, 75] },
    { name: 'Loss', data: [35, 15, 15, 35, 65, 40, 80, 25, 15, 85, 25, 75] },
    { name: 'Profit', data: [35, 145, 35, 35, 20, 105, 100, 10, 65, 45, 30, 10] },
    { name: 'Maintenance', data: [0, 0, 75, 0, 0, 115, 0, 0, 0, 0, 150, 0] },
  ];

  const stockChartOptions = {
    chart: {
      type: 'area',
      height: 80,
      width: '100%',
      sparkline: { enabled: true },
    },
    colors: ['#5E35B1'],
    stroke: { curve: 'smooth', width: 2 },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [0, 100],
      },
    },
    tooltip: { enabled: false },
  };

  const stockChartSeries = [{ name: 'Stock', data: [10, 25, 60, 40, 45, 30, 35] }];

  return (
    <Box sx={{ width: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      {/* KPI Section with CSS Grid Layout */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
          },
          gap: 2,
          width: '100%',
        }}
      >
        {/* Card 1: Earning */}
        <Card
          elevation={0}
          sx={{
            backgroundColor: '#5E35B1',
            backgroundImage: 'radial-gradient(circle at 100% 0%, #7E57C2 0%, #4527A0 100%)',
            color: '#FFF',
            borderRadius: '16px',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          <CardContent sx={{ p: 2.5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Avatar sx={{ backgroundColor: '#4527A0', borderRadius: '12px', width: 42, height: 42 }}>
                <EarningIcon sx={{ color: '#FFF' }} />
              </Avatar>
              <IconButton sx={{ color: '#FFF' }}>
                <MoreHorizIcon />
              </IconButton>
            </Box>
            <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="h5" sx={{ fontWeight: 800 }}>
                $500.00
              </Typography>
              <Avatar sx={{ width: 20, height: 20, backgroundColor: '#7E57C2' }}>
                <ArrowUpwardIcon sx={{ fontSize: 12, color: '#FFF' }} />
              </Avatar>
            </Box>
            <Typography variant="body2" sx={{ opacity: 0.8, mt: 0.5, fontWeight: 500 }}>
              Total Earning
            </Typography>
          </CardContent>
        </Card>

        {/* Card 2: Order */}
        <Card
          elevation={0}
          sx={{
            backgroundColor: '#1E88E5',
            backgroundImage: 'radial-gradient(circle at 100% 0%, #42A5F5 0%, #1565C0 100%)',
            color: '#FFF',
            borderRadius: '16px',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          <CardContent sx={{ p: 2.5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Avatar sx={{ backgroundColor: '#1565C0', borderRadius: '12px', width: 42, height: 42 }}>
                <OrderIcon sx={{ color: '#FFF' }} />
              </Avatar>
              <ButtonGroup
                size="small"
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  borderRadius: '8px',
                  p: '2px',
                  '& .MuiButton-root': {
                    border: 'none',
                    color: '#FFF',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    px: 1,
                    borderRadius: '6px !important',
                    textTransform: 'none',
                  },
                }}
              >
                <Button
                  onClick={() => setTimeRange('Month')}
                  sx={{ backgroundColor: timeRange === 'Month' ? '#1565C0 !important' : 'transparent' }}
                >
                  Month
                </Button>
                <Button
                  onClick={() => setTimeRange('Year')}
                  sx={{ backgroundColor: timeRange === 'Year' ? '#1565C0 !important' : 'transparent' }}
                >
                  Year
                </Button>
              </ButtonGroup>
            </Box>
            <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="h5" sx={{ fontWeight: 800 }}>
                $961.00
              </Typography>
              <Avatar sx={{ width: 20, height: 20, backgroundColor: '#1E88E5' }}>
                <ArrowDownwardIcon sx={{ fontSize: 12, color: '#FFF' }} />
              </Avatar>
            </Box>
            <Typography variant="body2" sx={{ opacity: 0.8, mt: 0.5, fontWeight: 500 }}>
              Total Order
            </Typography>
          </CardContent>
        </Card>

        {/* Card 3: Combined Small Cards */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, gridColumn: { xs: '1', sm: '1 / -1', lg: 'auto' } }}>
          <Card elevation={0} sx={{ borderRadius: '16px', backgroundColor: '#1E88E5', color: '#FFF', width: '100%' }}>
            <CardContent sx={{ p: '18px 20px !important', display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ backgroundColor: '#1565C0', borderRadius: '12px', width: 40, height: 40 }}>
                <StoreIcon sx={{ color: '#FFF' }} />
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '1.1rem' }}>
                  $203k
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.8, fontWeight: 500 }}>
                  Total Income
                </Typography>
              </Box>
            </CardContent>
          </Card>

          <Card elevation={0} sx={{ borderRadius: '16px', backgroundColor: '#FFF', border: '1px solid #E3E8EF', width: '100%' }}>
            <CardContent sx={{ p: '18px 20px !important', display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ backgroundColor: '#FFF8E1', borderRadius: '12px', width: 40, height: 40 }}>
                <StoreIcon sx={{ color: '#FFC107' }} />
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#121926', fontSize: '1.1rem' }}>
                  $203k
                </Typography>
                <Typography variant="caption" sx={{ color: '#697586', fontWeight: 600 }}>
                  Total Store Volume
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Analytics Section with Flex / CSS Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' },
          gap: 2,
          width: '100%',
        }}
      >
        {/* Total Growth Bar Chart */}
        <Card
          elevation={0}
          sx={{
            borderRadius: '16px',
            p: 2.5,
            border: '1px solid #E3E8EF',
            backgroundColor: '#FFF',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box>
              <Typography variant="caption" sx={{ color: '#697586', fontWeight: 700, textTransform: 'uppercase' }}>
                Total Growth
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#121926' }}>
                $2,324.00
              </Typography>
            </Box>

            <FormControl size="small" sx={{ minWidth: 100 }}>
              <Select
                value={growthPeriod}
                onChange={(e) => setGrowthPeriod(e.target.value)}
                sx={{ borderRadius: '8px', fontSize: '0.8rem', fontWeight: 600, height: 32 }}
              >
                <MenuItem value="Today">Today</MenuItem>
                <MenuItem value="This Month">This Month</MenuItem>
                <MenuItem value="This Year">This Year</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ width: '100%', overflow: 'hidden' }}>
            <Chart options={growthChartOptions} series={growthChartSeries} type="bar" height={320} width="100%" />
          </Box>
        </Card>

        {/* Popular Stocks Section */}
        <Card
          elevation={0}
          sx={{
            borderRadius: '16px',
            p: 2.5,
            border: '1px solid #E3E8EF',
            backgroundColor: '#FFF',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#121926', fontSize: '1rem' }}>
              Popular Stocks
            </Typography>
            <IconButton size="small">
              <MoreHorizIcon />
            </IconButton>
          </Box>

          <Card elevation={0} sx={{ backgroundColor: '#EDE7F6', borderRadius: '12px', p: 2, mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#5E35B1' }}>
                  Bajaj Finery
                </Typography>
                <Typography variant="caption" sx={{ color: '#5E35B1', opacity: 0.8, fontWeight: 600 }}>
                  10% Profit
                </Typography>
              </Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#121926' }}>
                $1839.00
              </Typography>
            </Box>
            <Box sx={{ mt: 1, width: '100%', overflow: 'hidden' }}>
              <Chart options={stockChartOptions} series={stockChartSeries} type="area" height={80} width="100%" />
            </Box>
          </Card>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {[
              { name: 'Bajaj Finserv', amount: '$1839.00', profit: '10% Profit', isUp: true },
              { name: 'TTML', amount: '$100.00', profit: '10% Loss', isUp: false },
              { name: 'Reliance', amount: '$200.00', profit: '10% Profit', isUp: true },
              { name: 'TTML', amount: '$189.00', profit: '10% Loss', isUp: false },
              { name: 'Stolon', amount: '$189.00', profit: '10% Loss', isUp: false },
            ].map((stock, idx) => (
              <React.Fragment key={idx}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#121926', fontSize: '0.85rem' }}>
                      {stock.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: stock.isUp ? '#2E7D32' : '#C62828', fontWeight: 600 }}
                    >
                      {stock.profit}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#121926', fontSize: '0.85rem' }}>
                      {stock.amount}
                    </Typography>
                    <Avatar
                      sx={{
                        width: 18,
                        height: 18,
                        backgroundColor: stock.isUp ? '#E8F5E9' : '#FFEBEE',
                        borderRadius: '6px',
                      }}
                    >
                      {stock.isUp ? (
                        <KeyboardArrowUpIcon sx={{ fontSize: 14, color: '#2E7D32' }} />
                      ) : (
                        <KeyboardArrowDownIcon sx={{ fontSize: 14, color: '#C62828' }} />
                      )}
                    </Avatar>
                  </Box>
                </Box>
                {idx < 4 && <Divider sx={{ borderColor: '#F1F5F9' }} />}
              </React.Fragment>
            ))}
          </Box>
        </Card>
      </Box>
    </Box>
  );
};

export default DashboardHome;