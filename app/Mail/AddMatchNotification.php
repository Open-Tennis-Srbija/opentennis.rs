<?php

namespace App\Mail;

use App\Models\TenisMatch;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
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
    public function __construct(public TenisMatch $match)
    {
        
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            from: new Address('info@srpskatenisliga.rs', 'Srpska Tenis Liga'),
            subject: 'Novi meč dodat na SrpskaTenisLiga.rs',

        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'mail.match.added',
            with: ['winner' => $this->match->getWinnerName(),
                    'winner_uri' => $this->match->getPlayerUri('winner'),
                    'loser' => $this->match->getLoserName(),
                    'loser_uri' => $this->getPlayerUri('loser'),
                    'set_score' => $this->match->set_score,
                    'game_score' => $this->match->game_score,
                    'date' => $this->match->getFormatedDate(),
                    'location' => $this->match->match_location,
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
