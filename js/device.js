// Definiendo caracteristicas de Objeto
class Device {
  id;
  name;
  consumption;
  efficiency;
  time_on;
  room;
  constructor(name, consumption, efficiency, time_on, room) {
    this.name = name;
    this.consumption = consumption;
    this.efficiency = efficiency;
    this.time_on = time_on;
    this.room = room;
  }
}
