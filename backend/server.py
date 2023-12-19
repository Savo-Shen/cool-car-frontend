# encoding: utf-8
# @data:2023/10/30
# @author:Savo Shen
# 测试服务器后端
import cv2
import math
import time
import json
import numpy as np
from flask import Flask, render_template, Response, request

school_location = {
    "Library": {
        "is_arrived": False,
        "is_target": True,
    },
    "Classroom": {
        "is_arrived": False,
        "is_target": True,
    },
    "实验楼": {
        "is_arrived": False,
        "is_target": False,
    },
    "Canteen": {
        "is_arrived": False,
        "is_target": False,
    },
    "Dormitory": {
        "is_arrived": False,
        "is_target": False,
    }
}

controlCar = {
    "isHandControl": False,
    "xLinearSpeed" : 0,
    "yLinearSpeed" : 0,
    "zAngleSpeed"  : 0,
    "isActivate"   : True
}

app = Flask(__name__)

# 设置编码
app.config['JSON_AS_ASCII'] = False

camera = cv2.VideoCapture(0)


class Server:
    def __init__(self):
        # rospy.init_node('savo_server', anonymous=True)
        self.image = None
        self.traffic_image = None
        self.block_image = None
        self.guidepost_image = None
        self.traffic_data = {}
        # self.mecanum_pub = rospy.Publisher('/jetauto_controller/cmd_vel', geo_msg.Twist, queue_size=1)  # 底盘控制
        # self.hand_control_publisher = rospy.Publisher('/server/hand_control', Int8, queue_size=1)

        # depth_camera = rospy.get_param('/depth_camera/camera_name', 'camera')
        # rospy.Subscriber('/%s/rgb/image_raw' % depth_camera, Image, self.image_callback)  # 摄像头订阅
        # rospy.Subscriber('/yolov5/object_detect_image', Image, self.get_object_callback)
        # rospy.Subscriber('/yolov5/block_detect_image', Image, self.get_block_object_callback)
        # rospy.Subscriber('/yolov5/location_detect_image', Image, self.get_location_object_callback)
        # rospy.Subscriber('/savo/traffic_data', LocationList, self.get_traffic_data)

    def image_callback(self, ros_image):
        rgb_image = np.ndarray(shape=(ros_image.height, ros_image.width, 3), dtype=np.uint8,
                               buffer=ros_image.data)  # 原始 RGB 画面
        self.image = cv2.cvtColor(rgb_image, cv2.COLOR_RGB2BGR)

    def get_object_callback(self, ros_image):
        rgb_image = np.ndarray(shape=(ros_image.height, ros_image.width, 3), dtype=np.uint8,
                               buffer=ros_image.data)  # 原始 RGB 画面
        self.traffic_image = cv2.cvtColor(rgb_image, cv2.COLOR_RGB2BGR)
        self.traffic_image = msg.data

    def get_block_object_callback(self, ros_image):
        rgb_image = np.ndarray(shape=(ros_image.height, ros_image.width, 3), dtype=np.uint8,
                               buffer=ros_image.data)  # 原始 RGB 画面
        self.block_image = cv2.cvtColor(rgb_image, cv2.COLOR_RGB2BGR)

    def get_location_object_callback(self, ros_image):
        rgb_image = np.ndarray(shape=(ros_image.height, ros_image.width, 3), dtype=np.uint8,
                               buffer=ros_image.data)  # 原始 RGB 画面
        self.guidepost_image = cv2.cvtColor(rgb_image, cv2.COLOR_RGB2BGR)

    def get_traffic_data(self, location_list):
        location_list = location_list.locationList
        for i in range(0, 4):
            _ = location_list[i]
            school_location[_.location_name]['is_arrived'] = _.is_arrived
            school_location[_.location_name]['is_target'] = _.is_target

    def original_camera(self):
        while True:
            ret, frame = camera.read()

            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')  # concat frame one by one and show result

    def traffic_detect(self):
        while True:
            ret, frame = camera.read()
            
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')  # concat frame one by one and show result

    def block_detect(self):
        while True:
            ret, frame = camera.read()
            
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')  # concat frame one by one and show result

    def guidepost_detect(self):
        while True:
            ret, frame = camera.read()
            
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')  # concat frame one by one and show result


@app.route('/')
def index():
    # return render_template('index.html')
    return Response(json.dumps({'data': 'welcome to cool-car backend'}))

@app.route('/api/set_information', methods=["POST"])
def set_information():
    data = json.loads(request.get_data())
    print(data)

    school_location['Library']['is_arrived']   = data['Library']['is_arrived']
    school_location['Library']['is_target']    = data['Library']['is_target']
    school_location['Classroom']['is_arrived'] = data['Classroom']['is_arrived']
    school_location['Classroom']['is_target']  = data['Classroom']['is_target']
    school_location['实验楼']['is_arrived']     = data['实验楼']['is_arrived']
    school_location['实验楼']['is_target']      = data['实验楼']['is_target']
    school_location['Canteen']['is_arrived']   = data['Canteen']['is_arrived']
    school_location['Canteen']['is_target']    = data['Canteen']['is_target']
    school_location['Dormitory']['is_arrived'] = data['Dormitory']['is_arrived']
    school_location['Dormitory']['is_target']  = data['Dormitory']['is_target']
    return json.dumps(school_location)

@app.route('/api/information', methods=["GET", "POST"])
def information():
    return json.dumps(school_location)


@app.route('/api/control', methods=["POST"])
def control():
    # json_data = request.get_json()

    data = json.loads(request.get_data())["data"]
    print(data)
    controlCar['isHandControl'] = data['isHandControl']
    controlCar['xLinearSpeed']  = data['xLinearSpeed']
    controlCar['yLinearSpeed']  = data['yLinearSpeed']
    controlCar['zAngleSpeed']   = data['zAngleSpeed']
    controlCar['isActivate']    = data['isActivate']
    return json.dumps(controlCar)
    # try:
    #     print(json_data)
    #     is_hand_control = json_data['is_hand_control']
    #     x_linear_speed = json_data['x_linear_speed']
    #     y_linear_speed = json_data['y_linear_speed']
    #     z_angle_speed = json_data['z_angle_speed']
    #     is_activate = json_data['is_activate']
    #     # turn_camera = json_data['turn_camera']
    #     if is_hand_control == '1':
    #         server.hand_control_publisher.publish(1)
    #         print('is hand control ', is_hand_control)
    #         print('x_linear_speed: ', x_linear_speed)
    #         print('y_linear_speed: ', y_linear_speed)
    #         print('z_angle_speed: ', z_angle_speed)
            
    #     else:
    #         server.hand_control_publisher.publish(0)
    #         print('is hand control ', is_hand_control)

    #     # if is_activate is not '1':
    #     #     server.hand_control_publisher(True)
    #     #     server.mecanum_pub.publish(geo_msg.Twist())
    #     # else:
    #     #     server.hand_control_publisher(False)

    # except:
    #     message = 'ERROR: not full data'
    # return Response(json.dumps({'data': 'control success'}))


@app.route('/camera/original_camera')
def original_camera():
    return Response(server.original_camera(), mimetype='multipart/x-mixed-replace; boundary=frame')


@app.route('/camera/traffic_detect')
def traffic_detect():
    return Response(server.traffic_detect(), mimetype='multipart/x-mixed-replace; boundary=frame')


@app.route('/camera/block_detect')
def block_detect():
    return Response(server.block_detect(), mimetype='multipart/x-mixed-replace; boundary=frame')


@app.route('/camera/guidepost_detect')
def guidepost_detect():
    return Response(server.guidepost_detect(), mimetype='multipart/x-mixed-replace; boundary=frame')


server = Server()
app.run(debug=True, host='0.0.0.0', port=5003)

# rospy.spin()
