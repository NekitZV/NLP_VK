const back = document.querySelector("#va-sheet-container");
back.style.background  = 'linear-gradient(to top, #dfe9f3 0%, white 100%)';
var elem = document.createElement('style');
elem.innerHTML = 
    `@font-face {font-family: Moscow Sans Regular;src: url(custom/moscowsansregular.ttf);}
    `;

document.head.appendChild(elem);

// Предположим, что w.general.renderTo уже определен и является элементом DOM
const renderTo = document.getElementById(w.general.renderTo);

const items = w.data.primaryData.items;

const x_names = items.map(function(item) {
    return {
        name: item.keys[0]
    };
});

const yz_fil = items.map(function(item) {
    return {
        y: item.values[0]  
    };
});

const sz_fil = items.map(function(item) {
    return {
        y: item.values[1]  
    };
});

const ts_fil = items.map(function(item) {
    return {
        y: item.values[2]  
    };
});

const y_fil = items.map(function(item) {
    return {
        y: item.values[3]  
    };
});

const sv_fil = items.map(function(item) {
    return {
        y: item.values[4]  
    };
});

const vid_ts = items.map(function(item) {
    return {
        name: item.keys[1] 
    };
});

const vid_ts_value = vid_ts.map(item => item.name)[0];
console.log(vid_ts_value);

// Очищаем содержимое renderTo, если нужно
renderTo.innerHTML = '';

function chart_viz(block) {

    Highcharts.chart(block, {
    chart : {
        spacingLeft: 10,
        spacingRight: 10,
        spacingTop: 10,
        spacingBottom: 10,
        height: 400, // Устанавливаем высоту графика (в пикселях)
        width: 1392,
        style: {
            backgroundColor:'#ffffff'
        }
        },

    title: {
        text: null,
        align: 'left',
        style: {
            fontFamily: 'Moscow Sans Regular'
        }
    },

    subtitle: {
        text: null,
        align: 'left'
    },
    xAxis: {
        categories: x_names.map(item => item.name),
        style: {
            fontFamily: 'Moscow Sans Regular'
        },
        labels: {
            style: {
                fontSize: '12px',
                fontWeight: 'bold',
                //color: '#000000'
                color: '#333'
            }
        }
    },
    yAxis: {
        title: {
            text: null
        },
        min: 0,
        max: 600
    },
    tooltip: {
        shared: true,
        backgroundColor: '#FFFFFF',
        style: {
            color: '#000000'
        }},

    legend: {
        layout: 'horizontal',
        align: 'center',
        verticalAlign: 'top',
        itemStyle: {
            fontFamily: 'Moscow Sans Regular'
        }
    },

    plotOptions: {
        line: {
            dataLabels: {
                enabled: false
            }
        },
        series: {
            label: {
                connectorAllowed: false
            }
        }
    },

    series: [{
        name: 'ЮЗ',
        color: '#d76c9c',
        data: yz_fil.map(item => item.y),
        marker: {
            symbol: 'circle'
        }
    },{
        name: 'СЗ',
        color: '#9370db',
        data: sz_fil.map(item => item.y),
        marker: {
            symbol: 'circle'
        }
    },{
        name: 'Ц',
        color: '#f0ad4e',
        data: ts_fil.map(item => item.y),
        marker: {
            symbol: 'circle'
        }
    },{
        name: 'СВ',
        color: '#5bc0de',
        data: sv_fil.map(item => item.y),
        marker: {
            symbol: 'circle'
        }
    },{
        name: 'Ю',
        color: '#d9534f',
        data: y_fil.map(item => item.y),
        marker: {
            symbol: 'circle'
        }
    }],

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }

});

// Функция для проверки наличия элементов и применения стилей
function applyStyles() {
  // Проверяем наличие headerContainer
  var headerContainer = document.querySelector('.rb-filter-header-container');
  if (headerContainer) {
      headerContainer.style.fontFamily = 'Moscow Sans Regular';
      headerContainer.style.fontWeight = '700';
      headerContainer.style.borderRadius = '12px'; // Скругление углов
      headerContainer.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)'; // Тень
  } else {
      console.warn("Элемент с классом '.rb-filter-header-container' не найден");
  }

  // Проверяем наличие элементов списка
  var listItems = document.querySelectorAll('.rb-filter-list-container li');
  if (listItems.length > 0) {
      listItems.forEach(function(item) {
          item.style.fontFamily = 'Moscow Sans Regular';
          item.style.fontWeight = '700';
      });
  } else {
      console.warn("Элементы списка '.rb-filter-list-container li' не найдены");
  }
}

// Устанавливаем проверку каждые 500 мс
var intervalId = setInterval(function() {
  if (document.querySelector('.rb-filter-header-container') && document.querySelectorAll('.rb-filter-list-container li').length > 0) {
    applyStyles(); // Применяем стили, если элементы найдены
    clearInterval(intervalId); // Останавливаем проверку после нахождения элементов
  }
}, 100); // Проверка каждые 500 мс

const main_chart = document.querySelectorAll("#full_widget");
main_chart.forEach((card) => {
  card.addEventListener(
    "mouseenter",
    (event) => {
      // при наведении мыши выделяем элемент
      card.style.cursor = 'pointer';
      card.style.boxShadow = '0 4px 12px rgb(30,144,255,0.75)';
      //card.style.boxShadow = '0 4px 12px rgb(77, 100, 127, 0.82)';
    }
  );

  card.addEventListener(
    "mouseleave",
    (event) => {
      // при уходе мыши возвращаем прежний стиль
      card.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
    }
  );
});


}

if (vid_ts_value.includes('Все ТС')) {
        const cardHTML = `
        <div id = "full_widget" style="border-radius: 20px;box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2); overflow: hidden;  width: 1390px;">
        <div style="background-color: #9ba6a5; padding: 10px 20px; border-top-left-radius: 10px; border-top-right-radius: 10px;">
            <span style="font-family: 'Moscow Sans Regular'; font-size: 16px; font-weight: bold; color: #FFFFFF;">Количество ТС в ремонте по филиалам
        </span>
        </div>
        <div id = "ts_repair" style = "display: flex; justify-content: space-between; flex: 1;">
                <div id="ts_repair_chart" class="chart-container"></div> <!-- Контейнер для графика 2 -->
        </div>
        </div>
        `;

        renderTo.innerHTML = cardHTML;
        chart_viz('ts_repair_chart');

} 

else if (vid_ts_value.includes('Автобусы')){
    const cardHTML = `
        <div id = "full_widget_1" style="border-radius: 20px;box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2); overflow: hidden;  width: 1390px;">
        <div style="background-color: #3972f7; padding: 10px 20px; border-top-left-radius: 10px; border-top-right-radius: 10px;">
            <span style="font-family: 'Moscow Sans Regular'; font-size: 16px; font-weight: bold; color: #FFFFFF;">Количество автобусов в ремонте по филиалам
        </span>
        </div>
        <div id = "ts_repair_1" style = "display: flex; justify-content: space-between; flex: 1;">
                <div id="ts_repair_chart_1" class="chart-container"></div> <!-- Контейнер для графика 2 -->
        </div>
        </div>
        `;

        renderTo.innerHTML = cardHTML;
        chart_viz('ts_repair_chart_1');
        const ts_chart_sec= document.querySelector("#full_widget_1");
        ts_chart_sec.style.visibility = 'hidden';

}

else if (vid_ts_value.includes('Электробусы')){
    //#00A651
    const cardHTML = `
        <div id = "full_widget_2" style="border-radius: 20px;box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2); overflow: hidden;  width: 1390px;">
        <div style="background-color: #00A651; padding: 10px 20px; border-top-left-radius: 10px; border-top-right-radius: 10px;">
            <span style="font-family: 'Moscow Sans Regular'; font-size: 16px; font-weight: bold; color: #FFFFFF;">Количество электробусов в ремонте по филиалам
        </span>
        </div>
        <div id = "ts_repair_2" style = "display: flex; justify-content: space-between; flex: 1;">
                <div id="ts_repair_chart_2" class="chart-container"></div> <!-- Контейнер для графика 2 -->
        </div>
        </div>
        `;

        renderTo.innerHTML = cardHTML;
        chart_viz('ts_repair_chart_2');
        const ts_chart_th= document.querySelector("#full_widget_2");
        ts_chart_th.style.visibility = 'hidden';
}
