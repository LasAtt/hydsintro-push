import requests

def server():

    messages = {
        "to" : "/topics/global",
        "notification" : {
            "body" : "Who did this :joy:",
            "title" : ":joy:sound"
        },
        "notification" : {
            "body" : "NotLikeThis",
            "title" : "why"
        },
        "notification" : {
            "body" : "He's in",
            "title" : "Shrek confirmed for Smash"
        },
        "notification" : {
            "body" : "Foo",
            "title" : "SZK"
        },
        "notification" : {
            "body" : "Water meets pizza",
            "title" : "Pazza"
        },
        "notification" : {
            "body" : "ok",
            "title" : "not ok"
        },
        "notification" : {
            "body" : ":aaAA:",
            "title" : "how it feels like to chew 5 gum"
        },
        "notification" : {
            "body" : "delete this",
            "title" : "An urgent message"
        },
        "notification" : {
            "body" : "Firebase simply doesn't work",
            "title" : "Some feedback"
        },
        "notification" : {
            "body" : "It's 3AM again",
            "title" : "You know what"
        },
        "notification" : {
            "body" : ":thinking:",
            "title" : ":thinking:"
        },
        "notification" : {
            "body" : "ooffista",
            "title" : "oof"
        },
        "notification" : {
            "body" : "Hello there old chum",
            "title" : "YHBG"
        },
        "notification" : {
            "body" : "Seriously though why isn't firebase displaying these notifications",
            "title" : "major issue"
        }


    }

    headers = {
        "Authorization" : "key=AAAAWrSNZqQ:APA91bH15hnH58797ldiUmsJLuDGg2wZuZreoOpOlABeaVbgYE0_L-ON3Wp0EqxvvjvQy1FSEluT7P8XldFFe7C4l4ipzsA_5TesynsuJCixmtPxYJ-rPPBt_Fr6uhsNhqlbzVtVhxBa"
    }

    response = requests.post('https://fcm.googleapis.com/fcm/send',
        json=messages, headers=headers)

    print(response.status_code)    # HTTPのステータスコード取得
    print(response.text)    # レスポンスのHTMLを文字列で取得

server()
