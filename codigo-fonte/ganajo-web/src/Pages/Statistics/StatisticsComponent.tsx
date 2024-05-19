import * as React from 'react';
import { PieChart  } from '@mui/x-charts/PieChart';
import StatisticCard from './Components/StatisticCard.tsx';
import { Gauge } from '@mui/x-charts/Gauge';
import styles from './StatisticsComponent.module.scss';
import { CircularProgress, Grid } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import { getStatistics } from '../../Api/ganajoClient.ts';
import { useCallback, useEffect } from 'react';
import { StatisticsDTO } from '../../DTOs/Statistics.ts';
import formatTruncateValue from '../../Utils/formatTruncateValue.ts';
import { PieValueType } from '@mui/x-charts/models';
import { toast } from 'react-toastify';
const StatisticsComponent = () => {
    const [start, setStart] = React.useState<Dayjs>(dayjs(new Date().toString()));
    const [end, setEnd] = React.useState<Dayjs>(dayjs(new Date().toString()));
    const [statistics, setStatistics] = React.useState<StatisticsDTO>();
    const [topVendidos, setTopVendidos] = React.useState<PieValueType[]>();
    const [topCategorias, setTopCategorias] = React.useState<PieValueType[]>();
    const [topPedidosStatus, setTopPedidosStatus] = React.useState<PieValueType[]>();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    
    const getStatisticsAsync = useCallback(async () => {
        try {
            setIsLoading(true)
            const statisticsDb = await getStatistics(start.format(), end.format());
            setStatistics(statisticsDb);
        }catch(ex){
            toast.error(ex);
        }finally{
            setIsLoading(false);
        }
        
    }, [end, start]);

    useEffect(() => {
        const statistics = async () => {
            getStatisticsAsync();
        }
        statistics();
    }, [getStatisticsAsync])

    useEffect(() => {
        setTopVendidos(statistics?.topProdutos.map(m => {
            const produto : PieValueType = {
                id: m.id,
                value: Number(m.value), 
                label: `${m.key}: ${m.value}`
            }
            return produto;
        }))

    }, [setTopVendidos, statistics])

    useEffect(() => {
        setTopCategorias(statistics?.topCategorias.map(m => {
            const categoria : PieValueType = {
                id: m.id,
                value: Number(m.value), 
                label: `${m.key}: ${m.value}`
            }
            return categoria;
        }))

    }, [setTopCategorias, statistics])

    useEffect(() => {
        setTopPedidosStatus(statistics?.topStatusPedidos.map(m => {
            const statusPedido : PieValueType = {
                id: m.id,
                value: Number(m.value), 
                label: `${m.key}: ${m.value}`
            }
            return statusPedido;
        }))

    }, [setTopPedidosStatus, statistics])


  return (
    <div className={styles.container}>
        <div>
            <h1>Ganajo Overview </h1>
        </div>
        <div className={styles.statistics}>
            <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                        label="Começo"
                        defaultValue={dayjs()}
                        value={start}
                        onChange={(e) => setStart(e ?? dayjs(new Date().toString()))}
                    />  
                    <DateTimePicker
                        label="Fim"
                        defaultValue={dayjs()}
                        value={end}
                        onChange={(e) => setEnd(e ?? dayjs(new Date().toString()))}
                    />
                </LocalizationProvider>
            </div>
            {
                isLoading ? <CircularProgress size={'10rem'}/> :
                (
                    <div className={styles.statistics}>
                        <StatisticCard>
                            <h1>Vendas R$</h1>
                            <Gauge text={({ value, valueMax }) => `R$ ${value} / ${valueMax}`}  height={200} value={formatTruncateValue(statistics?.vendas ?? 0, 2)} valueMin={0} valueMax={10000} />
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
                                                data: topVendidos ?? [],
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
                                        <h1>Top 3 Categorias</h1>
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
                                                data: topCategorias ?? [],
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
                        <Grid item xs={12} md={6}>
                                <StatisticCard>
                                    <div className={styles.charts}>
                                        <h1>Status dos Pedidos</h1>
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
                                                data: topPedidosStatus ?? [],
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
                        <Grid container rowSpacing={0} columnSpacing={{ xs: 0, sm: 0, md: 0 }}>
                            <Grid item xs={12} md={6}>
                                <StatisticCard>
                                    <h4>Clientes</h4>
                                    <Gauge
                                    text={({ value, valueMax }) => `${value} / ${valueMax}`} 
                                    height={120} 
                                    value={statistics?.qtdClientes} 
                                    valueMin={0} 
                                    valueMax={200} />
                                </StatisticCard>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <StatisticCard>
                                    <h4>Bairros disponiveis</h4>
                                    <Gauge text={({ value, valueMax }) => `${value} / ${valueMax}`} height={120} value={statistics?.qtdBairros} valueMin={0} valueMax={100} />
                                </StatisticCard>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <StatisticCard>
                                    <h4>Produtos</h4>
                                    <Gauge text={({ value, valueMax }) => `${value} / ${valueMax}`} height={200} value={statistics?.qtdProdutos} valueMin={0} valueMax={125} />
                                </StatisticCard>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <StatisticCard>
                                    <h4>Preço médio</h4>
                                    <Gauge text={({ value, valueMax }) => `R$ ${value} / ${valueMax}`} height={200} value={formatTruncateValue(statistics?.precoMedio ?? 0, 2)} valueMin={0} valueMax={125} />
                                </StatisticCard>
                            </Grid>
                        </Grid>
                    </div>
                )
            }
        
        </div>
    </div>
  )
}

export default StatisticsComponent