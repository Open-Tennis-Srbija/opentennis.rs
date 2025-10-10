<?php

namespace App\Mail;

use App\Http\Controllers\TenisMatchController;
use App\Models\Court;
use App\Models\League;
use App\Models\TennisMatch;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class AddMatchNotification extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(public TennisMatch $match)
    {

    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            from: new Address('info@srpskatenisliga.rs', 'Srpska Tenis Liga'),
            subject: 'Novi singl meč je dodat na SrpskaTenisLiga.rs',

        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'mail.match.added',
            with: ['winner' => $this->match->winners()->first()->first_name . ' ' . $this->match->winners()->first()->last_name,
                    'winner_uri' => $this->match->winners()->first()->uri,
                    'loser' => $this->match->losers()->first()->first_name . ' ' . $this->match->losers()->first()->last_name,
                    'loser_uri' => $this->match->losers()->first()->uri,
                    'set_score' => $this->match->set_score,
                    'match_uri' => TenisMatchController::generateMatchUri($this->match->number),
                    'game_score' => $this->match->game_score,
                    'date' => $this->match->getFormatedDate(),
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
