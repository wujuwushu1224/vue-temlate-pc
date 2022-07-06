export default {
  data() {
    return {
      markers: [],
      circleList: [],
      dragItemList: [],
      rectRange: {
        // 托块活动范围
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
    }
  },
  methods: {
    clearMap() {
      this.markers = []
      this.dragItemList = []
      this.$refs.mapChart.amap && this.$refs.mapChart.amap.clearMap()
    },
    initMap() {
      return this.$refs.mapChart && this.$refs.mapChart.initChart()
    },
    mapBinding() {
      // 地图加拖拽-缩放-重置
      this.$refs.mapChart.amap.on('dragging', () => {
        this.handlerUpdateThumb()
      })
      this.$refs.mapChart.amap.on('zoomchange', () => {
        this.handlerUpdateThumb()
      })
      this.$refs.mapChart.amap.on('mapmove', () => {
        this.handlerUpdateThumb()
      })
      this.$refs.mapChart.amap.on('resize', () => {
        this.handlerUpdateThumb()
      })
      this.$refs.mapChart.amap.on('click', () => {
        this.handlerUpdateThumb()
      })
      window.onresize = () => {
        this.handlerUpdateThumb()
      }
    },
    mapAdd(inf) {
      this.$refs.mapChart.amap && this.$refs.mapChart.amap.add(inf)
    },
    mapRemove(inf) {
      this.$refs.mapChart.amap && this.$refs.mapChart.amap.remove(inf)
    },
    mapFitView() {
      this.$refs.mapChart.amap && this.$refs.mapChart.amap.setFitView()
    },
    mapSetZoom(num) {
      this.$refs.mapChart.amap && this.$refs.mapChart.amap.setZoom(num)
    },
    handleClickPolygons(element, propVal = 'districtId') {
      if (this.dragItemList.length) {
        const landNameArray = this.dragItemList.map((item) => item.data[propVal])
        if (landNameArray.includes(element[propVal])) {
          this.handleCloseMarker(
            this.dragItemList[landNameArray.indexOf(element[propVal])].data,
            propVal
          )
        }
      }
      const position = new AMap.LngLat(element.x, element.y)
      const pixel = this.$refs.mapChart.amap.lngLatToContainer(position)
      console.log(pixel)

      // 容器坐标是相对于整个窗口,所以加上四周占用的位置
      this.dragItemList.push({
        initPoint: {
          left: pixel.x,
          top: pixel.y,
        },
        data: element,
      })
    },
    handleEnterPolygons(element, propVal) {
      this.polygons.find((item) => {
        if (item.getExtData()[propVal] === element[propVal]) {
          item.setOptions({
            fillOpacity: 0.8,
          })
        }
      })
      const { x, y, district, color } = element
      const marker = new AMap.Marker({
        content: `<p class="map-marker-title" style="border:1px solid ${color};border-radius: 5px 5px 5px 0px;">${element[propVal]}</p>`,
        position: new AMap.LngLat(x, y),
        offset: new AMap.Pixel(0, -10),
      })
      this.theMarker = marker
      this.mapAdd(marker)
    },
    handleLeavePolygons(element, propVal) {
      this.polygons.find((item) => {
        if (item.getExtData()[propVal] === element[propVal]) {
          item.setOptions({
            fillOpacity: 0.3,
          })
        }
      })
      this.mapRemove(this.theMarker)
      this.theMarker = {}
    },
    setCircle(data) {
      const markers = []
      const distance = 60
      data.forEach((element) => {
        if (!element.x && !element.y) {
          return
        }
        const marker = new AMap.Marker({
          position: new AMap.LngLat(element.x, element.y),
          extData: element,
          zIndex: 1,
          bubble: false,
          offset: new AMap.Pixel(-distance / 2, -distance / 2), // 相对于基点的偏移位置
          content: `<div class="mapCircle" 
              style="width:${distance}px;height:${distance}px;line-height: ${distance}px;background-color:rgba(${
            element.color
          },0.68);border-color:rgba(${element.color},1)"
            >
              <p>${element.cityName}</p>
              <p>${element.buildingCount || element.tradeLandCount}</p>
            </div>`,
        })
        marker.on('mouseover', () => {
          // this.handleCircleMouseover(circle)
        })
        marker.on('mouseout', () => {
          // this.handleCircleMouseout(circle)
        })
        markers.push(marker)
      })
      return markers
    },
    handleCircleMouseover(element) {},
    handleCircleMouseout(element) {},
    // 点击标记点
    handleClickMarker(element, propVal = 'homeId') {
      if (this.dragItemList.length) {
        const landNameArray = this.dragItemList.map((item) => item.data[propVal])
        if (landNameArray.includes(element[propVal])) {
          this.handleCloseMarker(
            this.dragItemList[landNameArray.indexOf(element[propVal])].data,
            propVal
          )
        }
      }
      const position = new AMap.LngLat(element.x, element.y)
      const pixel = this.$refs.mapChart.amap.lngLatToContainer(position)
      console.log(pixel)

      // 容器坐标是相对于整个窗口,所以加上四周占用的位置
      this.dragItemList.push({
        initPoint: {
          left: pixel.x,
          top: pixel.y,
        },
        data: element,
      })
    },
    handleCloseMarker(data, propVal = 'homeId') {
      let dragItemList = JSON.parse(JSON.stringify(this.dragItemList))
      this.dragItemList = []
      const dragIndex = dragItemList.findIndex(
        (res) => res.data[propVal] === data[propVal]
      )
      dragItemList = dragItemList.map((item, index) => {
        item.data.resetRect = this.$refs['drag' + index][0].curRect
        return item
      })
      dragItemList.splice(dragIndex, 1)
      this.dragItemList = dragItemList
    },
    // 更新拖拽线
    handlerUpdateThumb() {
      this.dragItemList = this.dragItemList.map((res, index) => {
        const { x, y } = res.data
        const position = new AMap.LngLat(x, y)
        const pixel = this.$refs.mapChart.amap.lngLatToContainer(position)
        res.data.resetRect = this.$refs['drag' + index][0].curRect
        // 容器坐标是相对于整个窗口,所以加上四周占用的位置
        res.initPoint = {
          left: pixel.x,
          top: pixel.y,
        }
        return res
      })
    },
    setPolygons(mapData, propVal = 'district', isClick = false) {
      const polygons = []
      mapData &&
        mapData.length &&
        mapData.forEach((element) => {
          element.dboundary = element.dboundary || element.boundary
          if (element.dboundary) {
            const path = element.dboundary.split(';').map((item) => {
              return item.split(',').map((a) => Number(a.replace(' ', '')))
            })
            const polygon = new AMap.Polygon({
              path: path,
              strokeWeight: 1, // 线条宽度，默认为 1
              strokeColor: '#fff',
              fillColor: element.color || element['颜色'] || '#000',
              fillOpacity: 0.3,
              extData: element,
            })
            polygon.on('mouseover', () => {
              this.handleEnterPolygons(element, propVal)
            })
            polygon.on('mouseout', () => {
              this.handleLeavePolygons(element, propVal)
            })
            if (isClick) {
              polygon.on('click', () => {
                this.handleClickPolygons(element, '') // 每次只出一次概要框
              })
            }

            polygons.push(polygon)
          }
        })
      this.polygons = polygons
      return polygons
    },
    setMarkers(mapData, propVal = 'homeId') {
      const markers = []
      mapData.forEach((element, index) => {
        if (!element.x || !element.y) {
          console.log('数据没有坐标！！')
          return
        }
        const marker = new AMap.Marker({
          position: new AMap.LngLat(element.x, element.y),
          offset: new AMap.Pixel(-10, -10),
          content: `<div style="background-color:${
            element.color ? element.color : '#0d8aff'
          }" class="mapMarker">
              <i>${index + 1} </i>
            </div>`,
          // extData: element,
        })
        marker.on('click', () => {
          this.handleClickMarker(element, propVal)
        })
        markers.push(marker)
        element.data
      })
      this.markers = markers
      return markers
    },
    setPointTitle(dataList, propVal = 'homeId') {
      const markers = []
      dataList.forEach((element, index) => {
        if (!element.x || !element.y) {
          console.log('数据没有坐标！！')
          return
        }
        const marker = new AMap.Marker({
          position: new AMap.LngLat(element.x, element.y),
          offset: new AMap.Pixel(-10, -10),
          content: `<div class="cric-map-style title">
              <p >${element.groupDeveloperName ||
                element.groupDeveloperShortName}·${element.solutionName ||
            element.landName}</p>
            </div>`,
          extData: element,
        })
        // marker.on('mouseover', () => {
        // })
        // marker.on('mouseout', () => {
        // })
        marker.on('click', () => {
          this.handleClickMarker(element, propVal)
        })
        markers.push(marker)
      })
      return markers
    },
  },
}
