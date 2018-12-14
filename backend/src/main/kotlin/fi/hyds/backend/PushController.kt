package fi.hyds.backend

import org.springframework.messaging.simp.SimpMessagingTemplate
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.util.Random

@RestController
@RequestMapping("/push")
class PushController(private val template: SimpMessagingTemplate) {

    var pushing: Boolean = false

    @PostMapping("/50")
    fun push50() {
        if (pushing) return
        pushing = true
        template.convertAndSend("/topic/push50", StartPushSession("push50"))
        for (i in 1..50) {
            template.convertAndSend("/topic/push50/payload", Push50(randomString(100)))
        }
        template.convertAndSend("/topic/push50/finish", EndPushSession("push50"))
        pushing = false
    }

    @PostMapping("/25")
    fun push25OfDifferentCases() {
        if (pushing) return
        pushing = true
        template.convertAndSend("/topic/push25", StartPushSession("push25"))
        for (i in 1..25) {
            template.convertAndSend("/topic/push25/payload", Push25(randomString(100), "small"))
        }
        for (i in 1..25) {
            template.convertAndSend("/topic/push25/payload", Push25(randomString(10000), "medium"))
        }
        for (i in 1..25) {
            template.convertAndSend("/topic/push25/payload", Push25(randomString(100000), "large"))
        }
        template.convertAndSend("/topic/push25/finish", EndPushSession("push25"))
        pushing = false
    }
}

data class StartPushSession(val type: String)

data class EndPushSession(val type: String)

sealed class Message(val type: String) {
    val time = System.currentTimeMillis()
}

data class Push50(val message: String) : Message("push50")

data class Push25(val message: String, val size: String) : Message("push25")

data class InterArrival(val message: String) : Message("interArrival")

val random = Random()

fun randomString(size: Int) = (0..size).map { (65 + random.nextInt(57)).toChar() }.fold("", String::plus)
