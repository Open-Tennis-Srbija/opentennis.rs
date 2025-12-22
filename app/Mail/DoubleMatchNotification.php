<?php

namespace App\Mail;


use App\Models\Court;
use App\Models\League;
use App\Models\TennisMatch;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use App\Http\Controllers\TenisMatchController;



class DoubleMatchNotification extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(public TennisMatch $match)
    {
        //
    }
 
    public function envelope(): Envelope
    {
        return new Envelope(
            from: new Address('info@opentennis.rs', 'Open Tennis Srbija'),
            subject: 'Novi dubl meč je dodat na opentennis.rs',

        );
    }
    /**
     * Get the message envelope.
     */
    public function content(): Content
    {
        return new Content(
            view: 'mail.match.doubles',
            with: ['winner1' => $this->match->winners()->first()->first_name . ' ' . $this->match->winners()->first()->last_name,
                    'winner1_uri' => $this->match->winners()->first()->uri,
                    'loser1' => $this->match->losers()->first()->first_name . ' ' . $this->match->losers()->first()->last_name,
                    'loser1_uri' => $this->match->losers()->first()->uri,
                    'winner2' => $this->match->winners()->skip(1)->first()->first_name . ' ' . $this->match->winners()->skip(1)->first()->last_name,
                    'winner2_uri' => $this->match->winners()->skip(1)->first()->uri,
                    'loser2' => $this->match->losers()->skip(1)->first()->first_name . ' ' . $this->match->losers()->skip(1)->first()->last_name,
                    'loser2_uri' => $this->match->losers()->skip(1)->first()->uri,
                    'set_score' => $this->match->set_score,
                    'game_score' => $this->match->game_score,
                    'date' => $this->match->getFormatedDate(),
                    'match_uri' => TenisMatchController::generateMatchUri($this->match->number),
                    'location' => $this->match->county,
                    'court' => Court::find($this->match->court_id),
                    'league' => League::find($this->match->league_id),
                  ],
        );
    }


    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
