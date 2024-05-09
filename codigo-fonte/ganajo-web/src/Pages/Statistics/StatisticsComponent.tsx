import * as React from 'react';
import { PieChart  } from '@mui/x-charts/PieChart';
import StatisticCard from './Components/StatisticCard.tsx';
import { Gauge } from '@mui/x-charts/Gauge';
import styles from './StatisticsComponent.module.scss';
import { Grid } from '@mui/material';
const StatisticsComponent = () => {
  return (
    <div className={styles.container}>
        <div>
            <h1>Ganajo Overview </h1>
        </div>
        <div className={styles.statistics}>
        <StatisticCard>
            <h1>Vendas R$</h1>
            <Gauge text={({ value, valueMax }) => `${value} / ${valueMax}`}  height={200} value={4500.54} valueMin={0} valueMax={10000} />
        </StatisticCard>
        <Grid sx={{ flexDirection: { xs: 'column', md: "row"} }} container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
            <Grid item xs={12} md={6}>
                <StatisticCard>
                    <h1>Top 3 mais vendidos</h1>
                        <PieChart
                            margin={{ top: 150, bottom: 0, left: 0, right:0 }}
                            slotProps={{
                                legend: {
                                    direction: 'row', // Display legend items in a row
                                    position: {
                                      vertical: 'top', // Place the legend at the bottom
                                      horizontal: 'middle', // Center the legend horizontally
                                    },
                                    padding: 0, // No padding around the legend
                                },
                              }}
                            series={[{
                                data: [
                                    { id: 0, value: 10, label: `Prato feito: ${10}` },
                                    { id: 1, value: 15, label: `Macarronada: ${15}` },
                                    { id: 3, value: 20, label: `Whisky: ${20}` },
                                ],
                                innerRadius: 10,
                                outerRadius: 80,
                                paddingAngle: 5,
                                cornerRadius: 5,
                                startAngle: -90,
                                endAngle: 180,
                                cy: 30,
                                },
                            ]}
                            height={280}
                        />
                </StatisticCard>
            </Grid>
            <Grid item xs={12} md={6}>
                <StatisticCard>
                    <div className={styles.charts}>
                        <h1>Pedidos</h1>
                        <PieChart
                            margin={{ top: 150, bottom: 0, left: 0, right:0 }}
                            slotProps={{
                                legend: {
                                    direction: 'row', // Display legend items in a row
                                    position: {
                                    vertical: 'top', // Place the legend at the bottom
                                    horizontal: 'middle', // Center the legend horizontally
                                    },
                                    padding: 0, // No padding around the legend
                                },
                            }}
                            series={[{
                                data: [
                                    { id: 0, value: 10, label: `Em Analise: ${10}` },
                                    { id: 1, value: 15, label: `Em Preparo: ${15}` },
                                    { id: 3, value: 20, label: `Saiu Para Entrega: ${20}` },
                                    { id: 4, value: 87, label: `Entregue: ${87}` },
                                    { id: 5, value: 3, label: `Negado: ${3}` },
                                ],
                                innerRadius: 10,
                                outerRadius: 80,
                                paddingAngle: 5,
                                cornerRadius: 5,
                                startAngle: -90,
                                endAngle: 180,
                                cy: 30
                                },
                            ]}
                            height={280}
                        />
                    </div>
                </StatisticCard>
            </Grid>
        </Grid>
        <Grid container rowSpacing={0} columnSpacing={{ xs: 0, sm: 0, md: 0 }}>
            <Grid item xs={12} md={6}>
                <StatisticCard>
                    <h4>Clientes</h4>
                    <Gauge
                    text={({ value, valueMax }) => `${value} / ${valueMax}`} 
                    height={120} 
                    value={50} 
                    valueMin={0} 
                    valueMax={200} />
                </StatisticCard>
            </Grid>
            <Grid item xs={12} md={6}>
                <StatisticCard>
                    <h4>Bairros disponiveis</h4>
                    <Gauge text={({ value, valueMax }) => `${value} / ${valueMax}`} height={120} value={25} valueMin={0} valueMax={100} />
                </StatisticCard>
            </Grid>
            <Grid item xs={12} md={6}>
                <StatisticCard>
                    <h4>Produtos</h4>
                    <Gauge text={({ value, valueMax }) => `${value} / ${valueMax}`} height={150} value={45} valueMin={0} valueMax={125} />
                </StatisticCard>
            </Grid>
            <Grid item xs={12} md={6}>
                <StatisticCard>
                    <h4>Preço médio</h4>
                    <Gauge text={({ value, valueMax }) => `${value} / ${valueMax}`} height={150} value={45.44} valueMin={0} valueMax={125} />
                </StatisticCard>
            </Grid>
        </Grid>
        </div>
    </div>
  )
}

export default StatisticsComponent