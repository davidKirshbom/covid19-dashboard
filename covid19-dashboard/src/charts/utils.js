const updateCharByCurrentTheme = (chart,isThemeWhite) => {
    chart.options.scales.yAxes[0].scaleLabel.fontColor = isThemeWhite ? 'black' : 'white'
    if (chart.options.scales.yAxes[1])
    chart.options.scales.yAxes[1].scaleLabel.fontColor=isThemeWhite? 'black': 'white'
    
    chart.data.datasets.forEach(data=>{if(data.datalabels)data.datalabels.color=isThemeWhite ? 'black' : 'white'})
    chart.options.scales.xAxes[0].scaleLabel.fontColor = isThemeWhite ? 'black' : 'white'

    chart.options.scales.yAxes[0].ticks.fontColor = isThemeWhite ? 'black' : 'white'
    chart.options.scales.xAxes[0].ticks.fontColor=isThemeWhite?'black': 'white'
    chart.options.plugins.datalabels.color=isThemeWhite? 'black':'white'
    chart.options.legend.labels.fontColor=isThemeWhite? 'black':'white'
    return chart
}
export {updateCharByCurrentTheme}